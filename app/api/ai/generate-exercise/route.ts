export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, userProgress, exercises } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import Anthropic from '@anthropic-ai/sdk';
import { nanoid } from 'nanoid';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type ExerciseType = 'grammar' | 'vocabulary' | 'reading' | 'writing' | 'speaking';

// ─── Prompt templates per exercise type ────────────────────────────────────

const CONTENT_SCHEMA: Record<ExerciseType, string> = {
  grammar: `
{
  "questions": [
    {
      "id": "1",
      "sentence": "The client ___ the contract yesterday.",
      "options": ["sign", "signed", "has signed", "was signing"],
      "correctAnswer": "signed",
      "explanation": "Past simple is used for completed actions at a specific time in the past."
    }
    // 3-5 questions total
  ]
}
Note: the blank is always ___ . Options must be 4 distinct choices. correctAnswer must exactly match one option.`,

  vocabulary: `
{
  "cards": [
    {
      "id": "1",
      "word": "Leverage",
      "definition": "Power or advantage used to achieve a goal",
      "example": "Our strong pipeline gives us leverage in the negotiation.",
      "businessContext": "Common in negotiation and strategy discussions."
    }
    // 4-6 cards total
  ]
}`,

  reading: `
{
  "passage": {
    "title": "Q2 Performance Update",
    "type": "email",
    "content": "Full text of the business document here (150-250 words).",
    "wordCount": 180
  },
  "questions": [
    {
      "id": "1",
      "question": "What is the main purpose of this document?",
      "type": "multiple-choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B",
      "explanation": "The document clearly states..."
    }
    // 3 questions: mix of multiple-choice and true-false
  ]
}
Note: passage.type must be one of: email | article | report | memo`,

  writing: `
{
  "prompt": {
    "id": "1",
    "title": "Complaint Email",
    "scenario": "Detailed scenario description for the student...",
    "context": "email",
    "targetAudience": "client",
    "desiredTone": "professional",
    "wordCountMin": 100,
    "wordCountMax": 200
  }
}
Note: context must be one of: email | presentation | report | meeting
targetAudience: colleague | manager | client | team
desiredTone: professional | casual | formal`,

  speaking: `
{
  "prompt": {
    "id": "1",
    "question": "Your manager just asked you to present the Q3 results to the board in 2 minutes. What do you say?",
    "sampleAnswer": "A full example answer of 60-80 words...",
    "tips": ["Be concise", "Lead with the headline number", "End with a clear takeaway"],
    "maxDurationSeconds": 60
  }
}`,
};

const DIFFICULTY_GUIDANCE = {
  easy:   'Beginner level. Use simple, common vocabulary. Short sentences. Clear context.',
  medium: 'Intermediate. Business terminology expected. Realistic scenarios.',
  hard:   'Advanced. Complex grammar, nuanced vocabulary, multi-step scenarios.',
};

// ─── Route ─────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const type: ExerciseType = body.type;

    if (!['grammar', 'vocabulary', 'reading', 'writing', 'speaking'].includes(type)) {
      return NextResponse.json({ error: 'Invalid exercise type' }, { status: 400 });
    }

    // ── 1. Get user context ──────────────────────────────────────────────
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // ── 2. Get recently completed exercises of this type (avoid repeats) ──
    const recentTitles = await db
      .select({ title: exercises.title })
      .from(userProgress)
      .innerJoin(exercises, eq(userProgress.exerciseId, exercises.id))
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.completedAt))
      .limit(30);

    const avoidTopics = recentTitles.map(r => r.title).join(', ');

    // ── 3. Get accuracy for this skill type to determine difficulty ───────
    const [typeStats] = await db
      .select({
        avgAccuracy: sql<number>`ROUND(AVG(${userProgress.accuracy}), 0)`,
        count: sql<number>`COUNT(*)`,
      })
      .from(userProgress)
      .innerJoin(exercises, eq(userProgress.exerciseId, exercises.id))
      .where(eq(userProgress.userId, userId));

    const avgAccuracy = Number(typeStats?.avgAccuracy ?? 70);
    const skillLevel = (() => {
      const levels: Record<string, number> = {
        grammar: user.grammarLevel, vocabulary: user.vocabularyLevel,
        listening: user.listeningLevel, speaking: user.speakingLevel,
        reading: user.readingLevel, writing: user.writingLevel,
      };
      return levels[type] ?? 1;
    })();

    // Adaptive difficulty: if accuracy < 60% → easy, 60-80% → medium, >80% → hard
    const difficulty = avgAccuracy < 60 ? 'easy' : avgAccuracy < 80 ? 'medium' : 'hard';

    // ── 4. Build prompt ───────────────────────────────────────────────────
    const prompt = `You are an expert Business English course creator. Generate ONE fresh ${type} exercise.

STUDENT PROFILE:
- Overall level: ${user.overallLevel} | ${type} skill level: ${skillLevel}/10
- Average accuracy: ${avgAccuracy}% → target difficulty: ${difficulty}
- ${DIFFICULTY_GUIDANCE[difficulty]}

RECENTLY COMPLETED (DO NOT REPEAT THESE TOPICS):
${avoidTopics || 'None yet — this is the first exercise.'}

REQUIREMENTS:
- Topic must be different from the ones listed above
- Business English focus (workplace, professional communication, corporate scenarios)
- Difficulty: ${difficulty}
- Be creative and varied — different grammar points, vocabulary themes, business scenarios

RETURN ONLY valid JSON matching this exact schema (no markdown fences, no explanation):
${CONTENT_SCHEMA[type]}`;

    // ── 5. Call Claude ────────────────────────────────────────────────────
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');

    const content = JSON.parse(raw);

    // ── 6. Build exercise title ───────────────────────────────────────────
    const titleMap: Record<ExerciseType, string> = {
      grammar:    `AI Grammar Practice — ${new Date().toLocaleDateString('en-GB')}`,
      vocabulary: `AI Vocabulary Practice — ${new Date().toLocaleDateString('en-GB')}`,
      reading:    content.passage?.title ?? `AI Reading Practice — ${new Date().toLocaleDateString('en-GB')}`,
      writing:    content.prompt?.title ?? `AI Writing Practice — ${new Date().toLocaleDateString('en-GB')}`,
      speaking:   `AI Speaking Practice — ${new Date().toLocaleDateString('en-GB')}`,
    };

    const estimatedTime: Record<ExerciseType, number> = {
      grammar: 180, vocabulary: 300, reading: 360, writing: 720, speaking: 300,
    };

    // ── 7. Save to DB ─────────────────────────────────────────────────────
    const exerciseId = nanoid();
    await db.insert(exercises).values({
      id: exerciseId,
      type,
      title: titleMap[type],
      description: `AI-generated ${difficulty} ${type} exercise tailored to your level.`,
      difficulty,
      estimatedTimeSeconds: estimatedTime[type],
      content,
      requiredOverallLevel: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ exerciseId });
  } catch (error) {
    console.error('generate-exercise error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to generate exercise' }, { status: 500 });
  }
}

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users, userProgress, exercises } from '@/db/schema';
import { eq, desc, gte, sql } from 'drizzle-orm';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user skill levels
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Get last 30 days of progress grouped by exercise type
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const progressByType = await db
      .select({
        type: exercises.type,
        count: sql<number>`COUNT(*)`,
        avgAccuracy: sql<number>`ROUND(AVG(${userProgress.accuracy}), 1)`,
        minAccuracy: sql<number>`MIN(${userProgress.accuracy})`,
        totalXP: sql<number>`SUM(${userProgress.xpEarned})`,
      })
      .from(userProgress)
      .innerJoin(exercises, eq(userProgress.exerciseId, exercises.id))
      .where(eq(userProgress.userId, userId))
      .groupBy(exercises.type);

    // Get 10 most recent exercises with accuracy
    const recentProgress = await db
      .select({
        type: exercises.type,
        title: exercises.title,
        difficulty: exercises.difficulty,
        accuracy: userProgress.accuracy,
        completedAt: userProgress.completedAt,
      })
      .from(userProgress)
      .innerJoin(exercises, eq(userProgress.exerciseId, exercises.id))
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.completedAt))
      .limit(10);

    // Build context object for Claude
    const skillLevels = {
      grammar: { level: user.grammarLevel, xp: user.grammarXP },
      vocabulary: { level: user.vocabularyLevel, xp: user.vocabularyXP },
      listening: { level: user.listeningLevel, xp: user.listeningXP },
      speaking: { level: user.speakingLevel, xp: user.speakingXP },
      reading: { level: user.readingLevel, xp: user.readingXP },
      writing: { level: user.writingLevel, xp: user.writingXP },
    };

    const hasHistory = progressByType.length > 0;

    const prompt = `You are an expert Business English coach. Respond with valid JSON only — no markdown fences, no explanation outside the JSON object.

STUDENT DATA:
- Overall level: ${user.overallLevel} | Total XP: ${user.totalXP} | Streak: ${user.currentStreak} days
- Skill levels: ${JSON.stringify(skillLevels)}
- Exercise history: ${hasHistory ? JSON.stringify(progressByType) : 'No exercises completed yet — this is a brand new student.'}
- Last 10 exercises: ${recentProgress.length > 0 ? JSON.stringify(recentProgress) : 'None yet.'}

${!hasHistory ? 'Since the student has no history yet, give a welcoming onboarding analysis: suggest where to start, what skills to prioritise first for a Business English learner, and set encouraging expectations.' : 'Analyse the data and give specific, data-driven feedback.'}

Return ONLY a compact JSON object (no whitespace/newlines inside strings, keep values short):
{"overallAssessment":"max 2 sentences","strengths":[{"skill":"name","insight":"max 15 words"}],"weaknesses":[{"skill":"name","insight":"max 15 words","priority":"high|medium|low"}],"recommendations":[{"title":"max 5 words","description":"max 20 words","exerciseType":"grammar|vocabulary|reading|writing|speaking","focusArea":"max 8 words","why":"max 15 words"}],"nextSession":{"suggestedTypes":["type1"],"suggestedDifficulty":"easy|medium|hard","focus":"max 15 words"},"motivationalNote":"max 20 words"}

Max: 2 strengths, 2 weaknesses, 2 recommendations. Short values — this is a UI card, not an essay.`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Strip markdown code fences if present
    const rawText = content.text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '');
    const analysis = JSON.parse(rawText);

    return NextResponse.json({
      analysis,
      generatedAt: new Date().toISOString(),
      dataPoints: {
        skillLevels,
        progressByType,
        recentExercisesAnalysed: recentProgress.length,
      },
    });
  } catch (error) {
    console.error('AI Coach error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to generate analysis', detail: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

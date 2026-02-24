// ============================================================================
// Progress Record API - Record exercise completion (supports demo mode)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, userProgress } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUserId } from '@/lib/demo';
import { calculateXP, calculateSkillXP } from '@/lib/gamification/xp-system';
import { calculateSkillLevels, calculateOverallLevel } from '@/lib/gamification/level-system';
import { nanoid } from 'nanoid';

interface RecordProgressRequest {
  exerciseId: string;
  exerciseType: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing';
  accuracy: number; // 0-100
  timeSpentSeconds: number;
  questionsTotal: number;
  questionsCorrect: number;
}

export async function POST(request: NextRequest) {
  try {
    // Support both auth session and demo mode
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: RecordProgressRequest = await request.json();
    const { exerciseId, exerciseType, accuracy, timeSpentSeconds, questionsTotal, questionsCorrect } = body;

    if (accuracy < 0 || accuracy > 100) {
      return NextResponse.json({ error: 'Invalid accuracy' }, { status: 400 });
    }

    // Fetch user
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate XP earned
    const xpResult = calculateXP({
      exerciseType,
      accuracy,
      timeSpentSeconds,
      streakDays: user.currentStreak,
    });

    const skillXP = calculateSkillXP(exerciseType, xpResult.totalXP);

    // New XP totals
    const newTotalXP = user.totalXP + xpResult.totalXP;
    const newSkillXP = {
      grammar: user.grammarXP + skillXP.grammar,
      vocabulary: user.vocabularyXP + skillXP.vocabulary,
      listening: user.listeningXP + skillXP.listening,
      speaking: user.speakingXP + skillXP.speaking,
      reading: user.readingXP + skillXP.reading,
      writing: user.writingXP + skillXP.writing,
    };

    const newSkillLevels = calculateSkillLevels(newSkillXP);
    const newOverallLevel = calculateOverallLevel(newTotalXP, newSkillLevels);
    const leveledUp = newOverallLevel > user.overallLevel;

    // ── Streak calculation ────────────────────────────────────────────────────
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    let newStreak = user.currentStreak;
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    if (lastActive) lastActive.setHours(0, 0, 0, 0);

    const lastActiveMs = lastActive?.getTime() ?? 0;
    const todayMs = todayStart.getTime();
    const yesterdayMs = todayMs - 86400000;

    if (lastActiveMs === todayMs) {
      // Already studied today — keep streak as-is
      newStreak = user.currentStreak;
    } else if (lastActiveMs === yesterdayMs) {
      // Studied yesterday — extend streak
      newStreak = user.currentStreak + 1;
    } else {
      // Gap of 2+ days — reset streak
      newStreak = 1;
    }

    const newLongestStreak = Math.max(user.longestStreak, newStreak);

    // Update user in DB
    await db.update(users).set({
      totalXP: newTotalXP,
      overallLevel: newOverallLevel,
      grammarXP: newSkillXP.grammar,
      vocabularyXP: newSkillXP.vocabulary,
      listeningXP: newSkillXP.listening,
      speakingXP: newSkillXP.speaking,
      readingXP: newSkillXP.reading,
      writingXP: newSkillXP.writing,
      grammarLevel: newSkillLevels.grammar,
      vocabularyLevel: newSkillLevels.vocabulary,
      listeningLevel: newSkillLevels.listening,
      speakingLevel: newSkillLevels.speaking,
      readingLevel: newSkillLevels.reading,
      writingLevel: newSkillLevels.writing,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActiveDate: todayStart,
      updatedAt: new Date(),
    }).where(eq(users.id, userId));

    // Record progress
    await db.insert(userProgress).values({
      id: nanoid(),
      userId,
      exerciseId,
      accuracy,
      timeSpentSeconds,
      xpEarned: xpResult.totalXP,
      userAnswer: { questionsCorrect, questionsTotal },
      correctAnswer: { questionsTotal },
      completedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      xpEarned: xpResult.totalXP,
      xpBreakdown: xpResult,
      leveledUp,
      newLevel: newOverallLevel,
      oldLevel: user.overallLevel,
      newTotalXP,
    });
  } catch (error) {
    console.error('POST /api/progress/record error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

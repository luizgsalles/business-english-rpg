// ============================================================================
// My Stats API - Get real user stats (supports demo mode)
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, userProgress } from '@/db/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { getCurrentUserId } from '@/lib/demo';
import { getXPProgress } from '@/lib/gamification/xp-system';

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Level progress
    const levelProgress = getXPProgress(user.totalXP);

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await db
      .select({
        date: sql<string>`DATE(${userProgress.completedAt})`,
        exercisesCompleted: sql<number>`COUNT(*)`,
        totalXP: sql<number>`SUM(${userProgress.xpEarned})`,
        avgAccuracy: sql<number>`AVG(${userProgress.accuracy})`,
      })
      .from(userProgress)
      .where(and(
        eq(userProgress.userId, userId),
        gte(userProgress.completedAt, sevenDaysAgo)
      ))
      .groupBy(sql`DATE(${userProgress.completedAt})`)
      .orderBy(sql`DATE(${userProgress.completedAt}) ASC`);

    // Totals
    const [totals] = await db
      .select({
        totalExercises: sql<number>`COUNT(*)`,
        totalTimeSeconds: sql<number>`SUM(${userProgress.timeSpentSeconds})`,
        avgAccuracy: sql<number>`AVG(${userProgress.accuracy})`,
      })
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, image: user.image },
      level: {
        overall: user.overallLevel,
        progress: levelProgress,
      },
      xp: {
        total: user.totalXP,
        currentLevelXP: levelProgress.currentXP,
        requiredForNextLevel: levelProgress.requiredXP,
        percentage: levelProgress.percentage,
      },
      skills: {
        levels: {
          grammar: user.grammarLevel,
          vocabulary: user.vocabularyLevel,
          listening: user.listeningLevel,
          speaking: user.speakingLevel,
          reading: user.readingLevel,
          writing: user.writingLevel,
        },
      },
      streaks: {
        current: user.currentStreak,
        longest: user.longestStreak,
      },
      totals: {
        exercisesCompleted: Number(totals?.totalExercises) || 0,
        totalTimeSeconds: Number(totals?.totalTimeSeconds) || 0,
        averageAccuracy: Math.round(Number(totals?.avgAccuracy) || 0),
      },
      recentActivity: recentActivity.map(a => ({
        date: a.date,
        exercisesCompleted: Number(a.exercisesCompleted),
        totalXP: Number(a.totalXP),
        avgAccuracy: Math.round(Number(a.avgAccuracy)),
      })),
    });
  } catch (error) {
    console.error('GET /api/me/stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// Dashboard Page - Real data from /api/me/stats
// ============================================================================

import { redirect } from 'next/navigation';
import { XPBar } from '@/components/dashboard/XPBar';
import { SkillsRadarWithLabels } from '@/components/dashboard/SkillsRadar';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap';
import { XPGrowthChart } from '@/components/dashboard/XPGrowthChart';
import { WeeklyStats } from '@/components/dashboard/WeeklyStats';
import { AccuracyTrend } from '@/components/dashboard/AccuracyTrend';
import Link from 'next/link';
import { getCurrentUser, isDemoMode } from '@/lib/demo';
import { db } from '@/lib/db';
import { users, userProgress } from '@/db/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { getXPProgress } from '@/lib/gamification/xp-system';

async function getUserStats(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return null;

  const levelProgress = getXPProgress(user.totalXP);

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
    .where(and(eq(userProgress.userId, userId), gte(userProgress.completedAt, sevenDaysAgo)))
    .groupBy(sql`DATE(${userProgress.completedAt})`)
    .orderBy(sql`DATE(${userProgress.completedAt}) ASC`);

  const [totals] = await db
    .select({
      totalExercises: sql<number>`COUNT(*)`,
      totalTimeSeconds: sql<number>`SUM(${userProgress.timeSpentSeconds})`,
      avgAccuracy: sql<number>`AVG(${userProgress.accuracy})`,
    })
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  return {
    user,
    levelProgress,
    recentActivity: recentActivity.map(a => ({
      date: a.date,
      exercisesCompleted: Number(a.exercisesCompleted),
      totalXP: Number(a.totalXP) || 0,
      avgAccuracy: Math.round(Number(a.avgAccuracy) || 0),
    })),
    totals: {
      exercisesCompleted: Number(totals?.totalExercises) || 0,
      totalTimeSeconds: Number(totals?.totalTimeSeconds) || 0,
      averageAccuracy: Math.round(Number(totals?.avgAccuracy) || 0),
    },
  };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isDemo = await isDemoMode();

  if (!user) {
    redirect('/auth/signin');
  }

  const userId = user.id;
  const stats = await getUserStats(userId);

  if (!stats) {
    redirect('/auth/signin');
  }

  const { levelProgress, recentActivity, totals } = stats;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 text-center font-semibold text-sm">
          🎮 DEMO MODE — dados reais salvos no banco. <a href="/auth/signin" className="underline ml-2">Criar conta</a>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link href="/exercises" className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                Start Learning
              </Link>
              <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden flex items-center justify-center text-neutral-600 font-semibold">
                {user.image
                  ? <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
                  : (user.name?.charAt(0) || 'U')
                }
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP Progress */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <XPBar
                currentXP={levelProgress.currentXP}
                requiredXP={levelProgress.requiredXP}
                level={user.overallLevel}
                percentage={levelProgress.percentage}
              />
            </div>

            {/* Weekly Stats */}
            <WeeklyStats
              exercisesCompleted={totals.exercisesCompleted}
              totalXP={user.totalXP}
              averageAccuracy={totals.averageAccuracy}
              studyTimeMinutes={Math.round(totals.totalTimeSeconds / 60)}
            />

            {/* Charts */}
            {recentActivity.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">XP Growth</h3>
                  <div className="h-64">
                    <XPGrowthChart
                      data={recentActivity.map(a => ({ date: a.date, xp: a.totalXP }))}
                      period="7d"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="h-64">
                    <AccuracyTrend
                      data={recentActivity.map(a => ({ date: a.date, accuracy: a.avgAccuracy }))}
                      targetAccuracy={75}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2">Sem atividade ainda</h3>
                <p className="text-gray-500 mb-4">Complete exercícios para ver seus gráficos de progresso aqui!</p>
                <Link href="/exercises" className="btn-primary">
                  Começar agora
                </Link>
              </div>
            )}

            {/* Heatmap */}
            {recentActivity.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <StudyHeatmap
                  data={recentActivity.map(a => ({
                    date: a.date,
                    exercisesCompleted: a.exercisesCompleted,
                    totalXP: a.totalXP,
                  }))}
                  weeks={12}
                />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Streak */}
            <StreakCounter
              currentStreak={user.currentStreak}
              longestStreak={user.longestStreak}
              todayCompleted={totals.exercisesCompleted > 0}
            />

            {/* Skills Radar */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skills Overview</h3>
              <SkillsRadarWithLabels
                skills={{
                  grammar: user.grammarLevel,
                  vocabulary: user.vocabularyLevel,
                  listening: user.listeningLevel,
                  speaking: user.speakingLevel,
                  reading: user.readingLevel,
                  writing: user.writingLevel,
                }}
                maxLevel={10}
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/daily-mix" className="block px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                  📅 Today&apos;s Mix
                </Link>
                <Link href="/exercises" className="block px-4 py-3 bg-neutral-50 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium">
                  📚 All Exercises
                </Link>
                <Link href="/achievements" className="block px-4 py-3 bg-neutral-50 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium">
                  🏆 Achievements
                </Link>
                <Link href="/settings" className="block px-4 py-3 bg-neutral-50 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium">
                  ⚙️ Settings
                </Link>
              </div>
            </div>

            {/* Total Stats Summary */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Resumo</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Exercícios</span>
                  <span className="font-bold">{totals.exercisesCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">XP Total</span>
                  <span className="font-bold">{user.totalXP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Accuracy</span>
                  <span className="font-bold">{totals.averageAccuracy > 0 ? `${totals.averageAccuracy}%` : '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Nível</span>
                  <span className="font-bold">Level {user.overallLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

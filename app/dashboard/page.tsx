// ============================================================================
// Dashboard Page - Real data + new design system
// ============================================================================

import { redirect } from 'next/navigation';
import { XPBar } from '@/components/dashboard/XPBar';
import { SkillsRadarWithLabels } from '@/components/dashboard/SkillsRadar';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { XPGrowthChart } from '@/components/dashboard/XPGrowthChart';
import { AccuracyTrend } from '@/components/dashboard/AccuracyTrend';
import Link from 'next/link';
import { getCurrentUser, isDemoMode } from '@/lib/demo';
import { db } from '@/lib/db';
import { users, userProgress } from '@/db/schema';
import { eq, and, gte, sql } from 'drizzle-orm';
import { getXPProgress } from '@/lib/gamification/xp-system';
import { Sidebar } from '@/components/ui/Sidebar';
import { AICoach } from '@/components/dashboard/AICoach';
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { DashboardGrid } from '@/components/ui/DashboardGrid';
import {
  BookOpen,
  Zap,
  Target,
  Clock,
  Play,
  ChevronRight,
} from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';

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

  const stats = await getUserStats(user.id);
  if (!stats) {
    redirect('/auth/signin');
  }

  const { levelProgress, recentActivity, totals } = stats;
  const studyTimeMinutes = Math.round(totals.totalTimeSeconds / 60);

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar
        userName={user.name}
        userImage={user.image}
        userLevel={stats.user.overallLevel}
        totalXP={stats.user.totalXP}
      />

      {/* Main content */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          </div>
          {isDemo && (
            <div className="mr-4 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full">
              Demo Mode
            </div>
          )}
          <div className="flex items-center gap-3">
            <Link href="/exercises" className="btn-primary btn-sm">
              <Play className="w-3.5 h-3.5" />
              Start Learning
            </Link>
            <SignOutButton compact />
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          {/* Demo banner */}
          {isDemo && (
            <div className="mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-4 flex items-center justify-between">
              <p className="text-sm font-medium">
                🎮 Demo Mode — progresso salvo no banco de dados.
              </p>
              <Link href="/auth/signin" className="text-sm font-semibold underline underline-offset-2">
                Criar conta gratuita
              </Link>
            </div>
          )}

          {/* XP Progress */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 mb-5">
            <XPBar
              currentXP={levelProgress.currentXP}
              requiredXP={levelProgress.requiredXP}
              level={stats.user.overallLevel}
              percentage={levelProgress.percentage}
            />
          </div>

          {/* Metric Cards */}
          <DashboardGrid cols={4} className="mb-5">
            <MetricCard
              label="Exercises Done"
              value={totals.exercisesCompleted}
              icon={<BookOpen className="w-5 h-5 text-primary-600" />}
              iconBg="bg-primary-50"
            />
            <MetricCard
              label="Pontos"
              value={stats.user.totalXP.toLocaleString()}
              icon={<Zap className="w-5 h-5 text-secondary-600" />}
              iconBg="bg-secondary-50"
            />
            <MetricCard
              label="Avg Accuracy"
              value={totals.averageAccuracy > 0 ? totals.averageAccuracy : '—'}
              suffix={totals.averageAccuracy > 0 ? '%' : undefined}
              icon={<Target className="w-5 h-5 text-success-600" />}
              iconBg="bg-success-50"
            />
            <MetricCard
              label="Study Time"
              value={studyTimeMinutes > 0 ? studyTimeMinutes : '—'}
              suffix={studyTimeMinutes > 0 ? 'min' : undefined}
              icon={<Clock className="w-5 h-5 text-cyan-600" />}
              iconBg="bg-cyan-50"
            />
          </DashboardGrid>

          {/* Charts + Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left: Charts */}
            <div className="lg:col-span-2 space-y-5">
              {recentActivity.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ChartCard title="XP Growth" subtitle="Last 7 days">
                    <XPGrowthChart
                      data={recentActivity.map(a => ({ date: a.date, xp: a.totalXP }))}
                      period="7d"
                    />
                  </ChartCard>
                  <ChartCard title="Accuracy Trend" subtitle="Last 7 days">
                    <AccuracyTrend
                      data={recentActivity.map(a => ({ date: a.date, accuracy: a.avgAccuracy }))}
                      targetAccuracy={75}
                    />
                  </ChartCard>
                </div>
              ) : (
                <div className="chart-card flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <BookOpen className="w-7 h-7 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-1">Nenhuma atividade ainda</h3>
                  <p className="text-sm text-slate-500 mb-5 max-w-xs">
                    Complete exercícios para ver seus gráficos de progresso aqui.
                  </p>
                  <Link href="/exercises" className="btn-primary">
                    <Play className="w-4 h-4" />
                    Começar agora
                  </Link>
                </div>
              )}

              {/* Skills Radar */}
              <div className="chart-card">
                <h3 className="section-title">Skills Overview</h3>
                <div className="h-72">
                  <SkillsRadarWithLabels
                    skills={{
                      grammar: stats.user.grammarLevel,
                      vocabulary: stats.user.vocabularyLevel,
                      listening: stats.user.listeningLevel,
                      speaking: stats.user.speakingLevel,
                      reading: stats.user.readingLevel,
                      writing: stats.user.writingLevel,
                    }}
                    maxLevel={10}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Streak */}
              <StreakCounter
                currentStreak={stats.user.currentStreak}
                longestStreak={stats.user.longestStreak}
                todayCompleted={totals.exercisesCompleted > 0}
              />

              {/* Quick Actions */}
              <div className="chart-card">
                <h3 className="section-title">Quick Actions</h3>
                <div className="space-y-1">
                  {[
                    { href: '/daily-mix', emoji: '📅', label: "Today's Mix" },
                    { href: '/exercises', emoji: '📚', label: 'All Exercises' },
                    { href: '/achievements', emoji: '🏆', label: 'Achievements' },
                    { href: '/settings', emoji: '⚙️', label: 'Settings' },
                  ].map(({ href, emoji, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span>{emoji}</span>
                        <span>{label}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* AI Coach */}
              <AICoach />

              {/* Summary card */}
              <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl p-5 text-white">
                <h3 className="text-sm font-semibold mb-3 text-white/90">Resumo Geral</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Exercícios', value: totals.exercisesCompleted },
                    { label: 'Pontos', value: stats.user.totalXP.toLocaleString() },
                    { label: 'Streak', value: `${stats.user.currentStreak}d` },
                    { label: 'Nível', value: `Level ${stats.user.overallLevel}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-sm text-white/70">{label}</span>
                      <span className="text-sm font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

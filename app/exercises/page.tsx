import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/demo';
import { db } from '@/lib/db';
import { exercises } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { AIPractice } from '@/components/exercises/AIPractice';

const TYPE_META: Record<string, { icon: string; color: string; label: string }> = {
  grammar:    { icon: '📝', color: 'from-blue-500 to-blue-600',    label: 'Grammar' },
  vocabulary: { icon: '📚', color: 'from-purple-500 to-purple-600', label: 'Vocabulary' },
  listening:  { icon: '👂', color: 'from-pink-500 to-pink-600',    label: 'Listening' },
  speaking:   { icon: '🎤', color: 'from-amber-500 to-amber-600',  label: 'Speaking' },
  reading:    { icon: '👁️', color: 'from-emerald-500 to-emerald-600', label: 'Reading' },
  writing:    { icon: '✍️', color: 'from-cyan-500 to-cyan-600',    label: 'Writing' },
};

const DIFFICULTY_COLORS = {
  easy:   'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  hard:   'bg-red-100 text-red-700 border-red-200',
};

const DIFFICULTY_LABELS = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };

export default async function ExercisesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/signin');

  const allExercises = await db
    .select()
    .from(exercises)
    .where(eq(exercises.isActive, true))
    .orderBy(exercises.type, exercises.difficulty);

  const byType = {
    grammar:    allExercises.filter(e => e.type === 'grammar'),
    vocabulary: allExercises.filter(e => e.type === 'vocabulary'),
    listening:  allExercises.filter(e => e.type === 'listening'),
    speaking:   allExercises.filter(e => e.type === 'speaking'),
    reading:    allExercises.filter(e => e.type === 'reading'),
    writing:    allExercises.filter(e => e.type === 'writing'),
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <header className="bg-white/80 backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </Link>
              <h1 className="text-3xl font-bold mt-2">
                <span className="text-gradient">All Exercises</span> 📚
              </h1>
              <p className="text-muted-foreground mt-1">Browse and practice all available exercises</p>
            </div>
            <Link href="/daily-mix" className="btn-accent">
              <span>🎯</span>
              <span>Daily Mix</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container-custom py-12">
        {/* AI Practice */}
        <AIPractice />

        {/* Stats Banner */}
        <div className="card-glass mb-8 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">{allExercises.length} Exercises Available</h3>
              <p className="text-sm text-muted-foreground">
                Your level: <span className="font-semibold text-gradient">Level {user.overallLevel}</span>
              </p>
            </div>
            <div className="flex gap-6 flex-wrap">
              {Object.entries(byType).map(([type, list]) => (
                <div key={type} className="text-center">
                  <div className="text-2xl font-bold text-gradient">{list.length}</div>
                  <div className="text-xs text-muted-foreground capitalize">{type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExercises.map((exercise) => {
            const meta = TYPE_META[exercise.type] ?? TYPE_META.grammar;
            const isLocked = user.overallLevel < exercise.requiredOverallLevel;
            const difficulty = exercise.difficulty as keyof typeof DIFFICULTY_COLORS;

            return (
              <div key={exercise.id} className={`card group ${isLocked ? 'opacity-60' : ''}`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.color} text-white text-3xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {meta.icon}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{meta.label}</span>
                    <span className={`badge ${DIFFICULTY_COLORS[difficulty]}`}>
                      {DIFFICULTY_LABELS[difficulty]}
                    </span>
                  </div>
                  {isLocked && <span className="text-xl">🔒</span>}
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-colors">
                  {exercise.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.round(exercise.estimatedTimeSeconds / 60)}min
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-gradient">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    XP
                  </span>
                </div>

                {isLocked ? (
                  <div className="text-center py-2 text-sm text-muted-foreground">
                    Requires Level {exercise.requiredOverallLevel}
                  </div>
                ) : (
                  <Link href={`/exercise/${exercise.id}`} className="btn-primary w-full">
                    Start Exercise
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

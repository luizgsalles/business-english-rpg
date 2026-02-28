// ============================================================================
// Daily Mix Page - Personalized Exercise Mix
// ============================================================================
// Purpose: Daily personalized mix of exercises based on user level
// Author: @dev (Dex) + @ux-expert (Uma)
// ============================================================================

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/demo';

export default async function DailyMixPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // TODO: Fetch personalized exercises from API
  // const exercises = await fetch(`/api/exercises/daily-mix`).then(res => res.json());

  // Mock exercises for development
  const dailyMix = [
    {
      id: '1',
      type: 'grammar',
      title: 'Present Perfect in Business Context',
      difficulty: 'medium',
      estimatedTime: 3,
      xpReward: 25,
      icon: '📖',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '2',
      type: 'vocabulary',
      title: 'Email Vocabulary - Professional Phrases',
      difficulty: 'easy',
      estimatedTime: 5,
      xpReward: 20,
      icon: '📚',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: '3',
      type: 'listening',
      title: 'Business Meeting Conversation',
      difficulty: 'hard',
      estimatedTime: 4,
      xpReward: 30,
      icon: '👂',
      color: 'from-pink-500 to-pink-600',
    },
    {
      id: '4',
      type: 'speaking',
      title: 'Pronunciation Practice - Common Mistakes',
      difficulty: 'medium',
      estimatedTime: 3,
      xpReward: 25,
      icon: '🎤',
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: '5',
      type: 'reading',
      title: 'Business Article Comprehension',
      difficulty: 'medium',
      estimatedTime: 6,
      xpReward: 28,
      icon: '📄',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  const totalTime = dailyMix.reduce((acc, ex) => acc + ex.estimatedTime, 0);
  const totalXP = dailyMix.reduce((acc, ex) => acc + ex.xpReward, 0);

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Voltar</span>
              </Link>
              <h1 className="text-3xl font-bold mt-2">
                <span className="text-gradient">Daily Mix</span> 🎯
              </h1>
              <p className="text-muted-foreground mt-1">
                Mix personalizado de exercícios para hoje
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Tempo Total</div>
                <div className="text-xl font-bold">{totalTime} min</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Pontos</div>
                <div className="text-xl font-bold text-gradient">+{totalXP}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        {/* Info Banner */}
        <div className="card-glass mb-8 p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">✨</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">
                Mix Personalizado para Você
              </h3>
              <p className="text-muted-foreground text-sm">
                Selecionamos estes exercícios baseados no seu nível atual (Level {user.overallLevel}),
                suas habilidades mais fracas e o que você precisa revisar hoje.
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid gap-6">
          {dailyMix.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index + 1}
            />
          ))}
        </div>

        {/* Complete All Button */}
        <div className="mt-12 text-center">
          <Link href={`/exercise/${dailyMix[0].id}`} className="btn-primary btn-lg">
            <span>🚀</span>
            <span>Começar Daily Mix</span>
            <span className="badge bg-white/20 text-white">
              {dailyMix.length} exercícios
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Complete todos para ganhar +{totalXP} pontos de bônus!
          </p>
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({
  exercise,
  index,
}: {
  exercise: {
    id: string;
    type: string;
    title: string;
    difficulty: string;
    estimatedTime: number;
    xpReward: number;
    icon: string;
    color: string;
  };
  index: number;
}) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    hard: 'bg-red-100 text-red-700 border-red-200',
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  };

  return (
    <div className="card group hover:scale-[1.01]">
      <div className="flex items-center gap-6">
        {/* Number */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center font-bold text-xl text-muted-foreground">
            {index}
          </div>
        </div>

        {/* Icon */}
        <div className="flex-shrink-0">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exercise.color} text-white text-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            {exercise.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {exercise.type}
            </span>
            <span className={`badge ${difficultyColors[exercise.difficulty as keyof typeof difficultyColors]}`}>
              {difficultyLabels[exercise.difficulty as keyof typeof difficultyLabels]}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-colors">
            {exercise.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {exercise.estimatedTime} min
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-primary-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              +{exercise.xpReward} pontos
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="flex-shrink-0">
          <Link
            href={`/exercise/${exercise.id}`}
            className="btn-outline"
          >
            Começar
          </Link>
        </div>
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/demo';

const MILESTONES = [
  { id: '1', name: '7 Dias Seguidos', description: 'Estude por 7 dias consecutivos', icon: '📅', unlocked: false, progress: 71 },
  { id: '2', name: 'Gramática Avançada', description: 'Atinja o nível 5 em Gramática', icon: '📚', unlocked: false, progress: 60 },
  { id: '3', name: 'Primeiro Exercício', description: 'Conclua seu primeiro exercício', icon: '⭐', unlocked: true, progress: 100 },
  { id: '4', name: 'Produtividade', description: 'Conclua 5 exercícios em um dia', icon: '⚡', unlocked: false, progress: 40 },
  { id: '5', name: 'Vocabulário Amplo', description: 'Aprenda 100 novas palavras', icon: '🌱', unlocked: false, progress: 22 },
  { id: '6', name: 'Precisão Total', description: 'Obtenha 100% de acerto em um exercício', icon: '🎯', unlocked: false, progress: 0 },
  { id: '7', name: 'E-mail Profissional', description: 'Conclua todos os exercícios de e-mail', icon: '💼', unlocked: false, progress: 33 },
  { id: '8', name: 'Comprometimento', description: 'Estude por 30 dias consecutivos', icon: '🏅', unlocked: false, progress: 17 },
  { id: '9', name: 'Madrugador', description: 'Conclua um exercício antes das 8h', icon: '🌅', unlocked: true, progress: 100 },
  { id: '10', name: 'Noturno', description: 'Conclua um exercício após as 22h', icon: '🦉', unlocked: false, progress: 0 },
  { id: '11', name: 'Multidisciplinar', description: 'Pratique 3 habilidades diferentes em um dia', icon: '🌍', unlocked: false, progress: 67 },
  { id: '12', name: 'Estudante Dedicado', description: 'Acumule 5.000 pontos de progresso', icon: '💎', unlocked: false, progress: 30 },
];

export default async function AchievementsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  const unlockedCount = MILESTONES.filter((m) => m.unlocked).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">Conquistas</h1>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">{unlockedCount}/{MILESTONES.length}</div>
              <div className="text-sm text-slate-500">Conquistados</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Progress Banner */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-slate-800">Progresso Geral</span>
            <span className="text-primary-600 font-bold">{Math.round((unlockedCount / MILESTONES.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(unlockedCount / MILESTONES.length) * 100}%` }} />
          </div>
          <p className="text-sm text-slate-500 mt-2">{MILESTONES.length - unlockedCount} conquistas restantes</p>
        </div>

        {/* Milestone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MILESTONES.map((milestone) => (
            <div
              key={milestone.id}
              className={`bg-white rounded-xl border shadow-card p-5 transition-all ${
                milestone.unlocked
                  ? 'border-primary-200 bg-primary-50/30'
                  : 'border-slate-100 opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                  milestone.unlocked ? 'bg-primary-100' : 'bg-slate-100'
                }`}>
                  {milestone.unlocked ? milestone.icon : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-0.5">{milestone.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{milestone.description}</p>
                  <div className="flex items-center justify-between">
                    {milestone.unlocked ? (
                      <span className="text-xs text-success-600 font-semibold">✓ Conquistado</span>
                    ) : (
                      <span className="text-xs text-slate-400">{milestone.progress}% concluído</span>
                    )}
                  </div>
                  {!milestone.unlocked && milestone.progress > 0 && (
                    <div className="progress-bar mt-2">
                      <div className="progress-fill" style={{ width: `${milestone.progress}%` }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

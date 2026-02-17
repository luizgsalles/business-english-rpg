'use client';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  todayCompleted?: boolean;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  todayCompleted = false,
}: StreakCounterProps) {
  const isNewRecord = currentStreak === longestStreak && currentStreak > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title mb-0">Sequência de Estudos</h3>
      </div>

      <div className="text-center mb-5">
        <div className="text-5xl font-bold text-primary-600 mb-1">
          {currentStreak}
        </div>
        <div className="text-sm text-slate-500">
          {currentStreak === 1 ? 'dia consecutivo' : 'dias consecutivos'}
        </div>
        {isNewRecord && currentStreak > 0 && (
          <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full">
            Novo recorde!
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mb-4">
        {todayCompleted ? (
          <div className="flex items-center gap-2 text-success-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Estudo de hoje concluído!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Estude hoje para manter a sequência</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Maior sequência:</span>
          <span className="font-semibold text-slate-800">
            {longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}
          </span>
        </div>
      </div>

      {currentStreak === 0 && (
        <p className="mt-3 text-center text-xs text-slate-400">
          Complete um exercício hoje para iniciar sua sequência!
        </p>
      )}
    </div>
  );
}

export function StreakCounterCompact({ currentStreak, todayCompleted }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-lg border border-primary-100">
      <div className="text-2xl font-bold text-primary-600">{currentStreak}</div>
      <div className="text-xs text-slate-600">dias consecutivos</div>
      {todayCompleted && (
        <div className="ml-auto text-success-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

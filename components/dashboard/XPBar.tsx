'use client';

import { useEffect, useState } from 'react';

interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
  percentage: number;
  animated?: boolean;
}

export function XPBar({
  currentXP,
  requiredXP,
  level,
  percentage,
  animated = true,
}: XPBarProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercentage(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-900">Nível {level}</span>
          <span className="text-sm text-slate-500">
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} pontos
          </span>
        </div>
        <span className="text-sm font-semibold text-primary-500">
          {percentage}%
        </span>
      </div>

      <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 xp-bar-gradient rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${displayPercentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-slate-700 mix-blend-difference">
            {percentage}% para o próximo nível
          </span>
        </div>
      </div>

      <div className="mt-1 text-xs text-slate-500 text-right">
        {requiredXP - currentXP > 0
          ? <span>{(requiredXP - currentXP).toLocaleString()} pontos para o Nível {level + 1}</span>
          : <span className="text-success-600 font-semibold">Próximo nível disponível!</span>
        }
      </div>
    </div>
  );
}

export function XPBarCompact({ level, percentage }: Pick<XPBarProps, 'level' | 'percentage' | 'currentXP' | 'requiredXP'>) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-semibold text-slate-700">Nível {level}</span>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-slate-500">{percentage}%</span>
      </div>
    </div>
  );
}

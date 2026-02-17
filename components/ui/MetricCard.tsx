import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  iconBg?: string;
  trend?: number; // percentage change, positive = up, negative = down
  trendLabel?: string;
  suffix?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon,
  iconBg = 'bg-primary-50',
  trend,
  trendLabel,
  suffix,
  className = '',
}: MetricCardProps) {
  const hasTrend = trend !== undefined;
  const isUp = trend !== undefined && trend > 0;
  const isDown = trend !== undefined && trend < 0;

  return (
    <div className={`metric-card ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900 leading-none">
            {value}
            {suffix && <span className="text-lg font-semibold text-slate-400 ml-0.5">{suffix}</span>}
          </p>
          {hasTrend && (
            <div className="mt-2">
              {isUp && (
                <span className="trend-up">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{trend}% {trendLabel}
                </span>
              )}
              {isDown && (
                <span className="trend-down">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {trend}% {trendLabel}
                </span>
              )}
              {!isUp && !isDown && (
                <span className="trend-neutral">
                  <Minus className="w-3.5 h-3.5" />
                  {trendLabel || 'No change'}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  height?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  actions,
  className = '',
  height = 280,
}: ChartCardProps) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-section-title text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div style={{ height }}>
        {children}
      </div>
    </div>
  );
}

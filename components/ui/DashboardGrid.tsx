import { ReactNode } from 'react';

interface DashboardGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

const colsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function DashboardGrid({ children, cols = 3, className = '' }: DashboardGridProps) {
  return (
    <div className={`grid ${colsClasses[cols]} gap-5 ${className}`}>
      {children}
    </div>
  );
}

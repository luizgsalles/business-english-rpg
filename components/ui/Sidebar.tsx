'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Calendar,
  Settings,
  Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/daily-mix', label: "Today's Mix", icon: Calendar },
  { href: '/exercises', label: 'Exercises', icon: BookOpen },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  userName?: string | null;
  userImage?: string | null;
  userLevel?: number;
  totalXP?: number;
}

export function Sidebar({ userName, userImage, userLevel = 1, totalXP = 0 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-sm leading-tight">
          Road to<br />Fluency
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-100 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
            {userImage ? (
              <img src={userImage} alt={userName || ''} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-primary-700">
                {userName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {userName || 'User'}
            </p>
            <p className="text-xs text-slate-500">Level {userLevel} · {totalXP.toLocaleString()} XP</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

'use client';

import { signOut } from 'next-auth/react';

interface SignOutButtonProps {
  compact?: boolean;
}

export function SignOutButton({ compact }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
      className={compact
        ? 'text-sm text-slate-500 hover:text-red-600 transition-colors font-medium px-2 py-1'
        : 'btn-outline'
      }
    >
      Sign Out
    </button>
  );
}

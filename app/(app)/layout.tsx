// ============================================================================
// App Shell Layout — shared layout for all authenticated routes
// ============================================================================
// Provides sidebar + main-content wrapper for dashboard, learn, exercises, etc.

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { isDemoMode } from '@/lib/demo';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Sidebar } from '@/components/ui/Sidebar';
import { cookies } from 'next/headers';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isDemo = await isDemoMode();

  if (!session?.user && !isDemo) {
    redirect('/auth/signin');
  }

  // Fetch user data for sidebar
  let sidebarUser = { name: session?.user?.name, image: session?.user?.image, overallLevel: 1, totalXP: 0 };

  try {
    const userId = isDemo
      ? (await cookies()).get('demo-user-id')?.value
      : session?.user?.id;

    if (userId) {
      const [user] = await db.select({
        name: users.name,
        image: users.image,
        overallLevel: users.overallLevel,
        totalXP: users.totalXP,
      }).from(users).where(eq(users.id, userId)).limit(1);

      if (user) sidebarUser = user;
    }
  } catch {
    // fallback to session data
  }

  return (
    <div className="app-shell">
      <Sidebar
        userName={sidebarUser.name}
        userImage={sidebarUser.image}
        userLevel={sidebarUser.overallLevel}
        totalXP={sidebarUser.totalXP}
      />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

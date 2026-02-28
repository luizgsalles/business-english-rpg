// ============================================================================
// App Shell Layout — shared layout for all authenticated routes
// ============================================================================

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Sidebar } from '@/components/ui/Sidebar';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  let sidebarUser = { name: session.user.name, image: session.user.image, overallLevel: 1, totalXP: 0 };

  try {
    if (session.user.id) {
      const [user] = await db.select({
        name: users.name,
        image: users.image,
        overallLevel: users.overallLevel,
        totalXP: users.totalXP,
      }).from(users).where(eq(users.id, session.user.id)).limit(1);

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

// ============================================================================
// Auth Utilities
// ============================================================================

import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Get current authenticated user from DB
 */
export async function getCurrentUser() {
  const { auth } = await import('@/auth');
  const session = await auth();

  if (!session?.user?.email) return null;

  return db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });
}

/**
 * Get current authenticated user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { auth } = await import('@/auth');
  const session = await auth();
  return session?.user?.id || null;
}

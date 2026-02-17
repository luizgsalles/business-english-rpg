// ============================================================================
// Demo Mode Utilities
// ============================================================================
// Purpose: Helper functions for demo mode
// Author: @dev (Dex) - AIOS Developer
// ============================================================================

import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Check if user is in demo mode
 */
export async function isDemoMode(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('demo-session')?.value === 'true';
}

/**
 * Get demo user data
 */
export async function getDemoUser() {
  const cookieStore = await cookies();
  const demoUserId = cookieStore.get('demo-user-id')?.value;

  if (!demoUserId) {
    return null;
  }

  const demoUser = await db.query.users.findFirst({
    where: eq(users.id, demoUserId),
  });

  return demoUser;
}

/**
 * Get user from either auth session or demo mode
 */
export async function getCurrentUser() {
  // Check if in demo mode first
  const isDemo = await isDemoMode();
  if (isDemo) {
    return await getDemoUser();
  }

  // Otherwise use regular auth
  const { auth } = await import('@/auth');
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  return user;
}

/**
 * Get user ID from either auth session or demo cookie
 * Use this in API routes that need to support both auth and demo mode
 */
export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();

  // Check demo mode first
  if (cookieStore.get('demo-session')?.value === 'true') {
    return cookieStore.get('demo-user-id')?.value || null;
  }

  // Otherwise check real auth session
  const { auth } = await import('@/auth');
  const session = await auth();
  return session?.user?.id || null;
}

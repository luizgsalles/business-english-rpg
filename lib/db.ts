// ============================================================================
// Database Connection - Drizzle ORM Client
// ============================================================================
// Purpose: Initialize Drizzle ORM client for Supabase Postgres
// Author: @dev (Dex) + @data-engineer (Dara)
// Based on: Task 5 (Database Schema)
// ============================================================================

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

// Next.js automatically loads .env.local, no need for dotenv here
// Use POSTGRES_URL (postgres.js doesn't support pgbouncer parameter)
// Fallback prevents module-load crash during next build (actual queries fail at runtime if not set)
const connectionString = process.env.POSTGRES_URL ?? 'postgresql://localhost/placeholder_build_only';

const client = postgres(connectionString, { prepare: false });

/**
 * Drizzle ORM client
 *
 * Use this client for all database operations
 *
 * @example
 * import { db } from '@/lib/db'
 * import { users } from '@/db/schema'
 *
 * const allUsers = await db.select().from(users)
 */
export const db = drizzle(client, { schema });

/**
 * Check database connection
 *
 * @returns true if connected, false otherwise
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

/**
 * Get database health status
 *
 * @returns Database health metrics
 */
export async function getDatabaseHealth(): Promise<{
  connected: boolean;
  latencyMs: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    await client`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    return {
      connected: true,
      latencyMs,
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;

    return {
      connected: false,
      latencyMs,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

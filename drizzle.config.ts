// ============================================================================
// Drizzle Configuration
// ============================================================================
// Purpose: Configure Drizzle ORM for Vercel Postgres / Supabase
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 5 (Database Schema)
// ============================================================================

import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

// Add SSL config to URL
const dbUrl = process.env.POSTGRES_URL_NON_POOLING! + '?sslmode=require';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;

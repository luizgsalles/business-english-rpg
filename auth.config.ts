// ============================================================================
// NextAuth v5 Configuration
// ============================================================================
// Purpose: Configure NextAuth v5 with Google OAuth + Email Magic Link
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 3 (Authentication Setup)
// Auth: NextAuth v5, Google OAuth, Email Magic Link (Resend)
// ============================================================================

import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

/**
 * NextAuth configuration
 *
 * Providers:
 * - Google OAuth (primary)
 * - Email Magic Link (secondary, via Resend)
 *
 * Session strategy: JWT (for Vercel Edge compatibility)
 */
export const authConfig = {
  providers: [
    // ============================================================================
    // GOOGLE OAUTH PROVIDER
    // ============================================================================
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // Allow linking if email already exists
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ? new Date() : null,
        };
      },
    }),

    // ============================================================================
    // EMAIL MAGIC LINK PROVIDER (Resend)
    // ============================================================================
    Resend({
      apiKey: process.env.RESEND_API_KEY || 'resend-placeholder',
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      name: 'Business English RPG',
    }),
  ],

  // ============================================================================
  // PAGES (Custom Auth Pages)
  // ============================================================================
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error', // Error page
    verifyRequest: '/auth/verify-request', // Email sent confirmation
  },

  // ============================================================================
  // CALLBACKS
  // ============================================================================
  callbacks: {
    /**
     * JWT callback - Add user ID to token
     */
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
      }

      // OAuth account linked
      if (account?.provider === 'google') {
        token.provider = 'google';
      }

      return token;
    },

    /**
     * Session callback - Add user ID to session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    /**
     * Authorized callback - Protect routes
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnExercise = nextUrl.pathname.startsWith('/exercise');
      const isOnProfile = nextUrl.pathname.startsWith('/profile');

      // Protected routes require authentication
      if (isOnDashboard || isOnExercise || isOnProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect to sign-in
      }

      // Public routes
      return true;
    },
  },

  // ============================================================================
  // SESSION STRATEGY
  // ============================================================================
  session: {
    strategy: 'jwt', // Use JWT for Vercel Edge compatibility
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ============================================================================
  // EVENTS
  // ============================================================================
  events: {
    /**
     * Create user event - Initialize user data
     */
    async createUser({ user }) {
      console.log('New user created:', user.email);
      // TODO: Initialize user gamification data (totalXP, levels, etc.)
      // This will be handled by the database adapter
    },

    /**
     * Sign in event - Update last active date
     */
    async signIn({ user }) {
      console.log('User signed in:', user.email);
      // TODO: Update lastActiveDate, check streak
      // This will be handled in the session callback or API route
    },
  },

  // ============================================================================
  // DEBUG (Development only)
  // ============================================================================
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

// ============================================================================
// Database Schema - Drizzle ORM
// ============================================================================
// Purpose: Define database schema for Business English RPG app
// Author: @dev (Dex) + @data-engineer (Dara) - AIOS Developer + Data Engineer
// Based on: Task 5 (Database Schema), DATABASE-SCHEMA.sql
// ORM: Drizzle ORM with Vercel Postgres
// ============================================================================

import { pgTable, text, integer, timestamp, boolean, real, index, varchar, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================================================
// AUTHENTICATION TABLES (NextAuth v5)
// ============================================================================

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),

  // User preferences
  nativeLanguage: varchar('native_language', { length: 10 }).default('pt-BR').notNull(),
  targetLanguage: varchar('target_language', { length: 10 }).default('en').notNull(),
  difficultyPreference: varchar('difficulty_preference', { length: 10 }).default('medium').notNull(),

  // Gamification
  totalXP: integer('total_xp').default(0).notNull(),
  overallLevel: integer('overall_level').default(1).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastActiveDate: timestamp('last_active_date', { mode: 'date' }),

  // Skills XP
  grammarXP: integer('grammar_xp').default(0).notNull(),
  vocabularyXP: integer('vocabulary_xp').default(0).notNull(),
  listeningXP: integer('listening_xp').default(0).notNull(),
  speakingXP: integer('speaking_xp').default(0).notNull(),
  readingXP: integer('reading_xp').default(0).notNull(),
  writingXP: integer('writing_xp').default(0).notNull(),

  // Skills levels (calculated from XP)
  grammarLevel: integer('grammar_level').default(1).notNull(),
  vocabularyLevel: integer('vocabulary_level').default(1).notNull(),
  listeningLevel: integer('listening_level').default(1).notNull(),
  speakingLevel: integer('speaking_level').default(1).notNull(),
  readingLevel: integer('reading_level').default(1).notNull(),
  writingLevel: integer('writing_level').default(1).notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  overallLevelIdx: index('users_overall_level_idx').on(table.overallLevel),
  totalXPIdx: index('users_total_xp_idx').on(table.totalXP),
}));

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (table) => ({
  userIdIdx: index('accounts_user_id_idx').on(table.userId),
  providerIdx: index('accounts_provider_idx').on(table.provider, table.providerAccountId),
}));

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (table) => ({
  userIdIdx: index('sessions_user_id_idx').on(table.userId),
}));

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').unique().notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (table) => ({
  identifierTokenIdx: index('verification_tokens_identifier_token_idx').on(table.identifier, table.token),
}));

// ============================================================================
// EXERCISES TABLE
// ============================================================================

export const exercises = pgTable('exercises', {
  id: text('id').primaryKey(),
  type: varchar('type', { length: 20 }).notNull(), // grammar, vocabulary, listening, writing, speaking, reading
  title: text('title').notNull(),
  description: text('description').notNull(),
  difficulty: varchar('difficulty', { length: 10 }).notNull(), // easy, medium, hard
  estimatedTimeSeconds: integer('estimated_time_seconds').notNull(),

  // Exercise content (JSON)
  content: jsonb('content').notNull(), // Flexible structure for different exercise types

  // Metadata
  requiredOverallLevel: integer('required_overall_level').default(1).notNull(),
  requiredSkill: varchar('required_skill', { length: 20 }),
  requiredSkillLevel: integer('required_skill_level'),

  // Statistics
  completionCount: integer('completion_count').default(0).notNull(),
  averageAccuracy: real('average_accuracy').default(0).notNull(),
  averageTimeSeconds: real('average_time_seconds').default(0).notNull(),

  // Admin
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  typeIdx: index('exercises_type_idx').on(table.type),
  difficultyIdx: index('exercises_difficulty_idx').on(table.difficulty),
  levelIdx: index('exercises_required_overall_level_idx').on(table.requiredOverallLevel),
  activeIdx: index('exercises_is_active_idx').on(table.isActive),
}));

// ============================================================================
// USER PROGRESS TABLE (Exercise Completion History)
// ============================================================================

export const userProgress = pgTable('user_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  exerciseId: text('exercise_id').references(() => exercises.id, { onDelete: 'cascade' }).notNull(),

  // Performance
  accuracy: integer('accuracy').notNull(), // 0-100
  timeSpentSeconds: integer('time_spent_seconds').notNull(),
  xpEarned: integer('xp_earned').notNull(),

  // User response (for review/analytics)
  userAnswer: jsonb('user_answer'),
  correctAnswer: jsonb('correct_answer'),

  // Timestamp
  completedAt: timestamp('completed_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_progress_user_id_idx').on(table.userId),
  exerciseIdIdx: index('user_progress_exercise_id_idx').on(table.exerciseId),
  completedAtIdx: index('user_progress_completed_at_idx').on(table.completedAt),
  userExerciseIdx: index('user_progress_user_exercise_idx').on(table.userId, table.exerciseId),
}));

// ============================================================================
// REVIEW SCHEDULE TABLE (SM-2 Spaced Repetition)
// ============================================================================

export const reviewSchedule = pgTable('review_schedule', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  exerciseId: text('exercise_id').references(() => exercises.id, { onDelete: 'cascade' }).notNull(),

  // SM-2 algorithm data
  repetitions: integer('repetitions').default(0).notNull(),
  easeFactor: real('ease_factor').default(2.5).notNull(),
  intervalDays: integer('interval_days').default(1).notNull(),
  nextReviewDate: timestamp('next_review_date', { mode: 'date' }).notNull(),

  // Mastery tracking
  masteryLevel: integer('mastery_level').default(0).notNull(), // 0-5

  // Timestamps
  lastReviewedAt: timestamp('last_reviewed_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('review_schedule_user_id_idx').on(table.userId),
  nextReviewDateIdx: index('review_schedule_next_review_date_idx').on(table.nextReviewDate),
  userExerciseIdx: index('review_schedule_user_exercise_idx').on(table.userId, table.exerciseId),
  masteryLevelIdx: index('review_schedule_mastery_level_idx').on(table.masteryLevel),
}));

// ============================================================================
// ACHIEVEMENTS TABLE
// ============================================================================

export const achievements = pgTable('achievements', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(), // Emoji or icon identifier
  category: varchar('category', { length: 20 }).notNull(), // streak, level, exercises, mastery, social

  // Unlock criteria
  criteriaType: varchar('criteria_type', { length: 30 }).notNull(), // streak_days, total_xp, exercises_completed, skill_level, etc.
  criteriaValue: integer('criteria_value').notNull(),

  // Rewards
  xpReward: integer('xp_reward').default(0).notNull(),

  // Display order
  sortOrder: integer('sort_order').default(0).notNull(),
  isHidden: boolean('is_hidden').default(false).notNull(),

  // Timestamps
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  categoryIdx: index('achievements_category_idx').on(table.category),
  criteriaIdx: index('achievements_criteria_idx').on(table.criteriaType),
  sortOrderIdx: index('achievements_sort_order_idx').on(table.sortOrder),
}));

// ============================================================================
// USER ACHIEVEMENTS TABLE (Junction Table)
// ============================================================================

export const userAchievements = pgTable('user_achievements', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  achievementId: text('achievement_id').references(() => achievements.id, { onDelete: 'cascade' }).notNull(),
  unlockedAt: timestamp('unlocked_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_achievements_user_id_idx').on(table.userId),
  achievementIdIdx: index('user_achievements_achievement_id_idx').on(table.achievementId),
  userAchievementIdx: index('user_achievements_user_achievement_idx').on(table.userId, table.achievementId),
  unlockedAtIdx: index('user_achievements_unlocked_at_idx').on(table.unlockedAt),
}));

// ============================================================================
// STUDY SESSIONS TABLE (Daily activity tracking)
// ============================================================================

export const studySessions = pgTable('study_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),

  // Session stats
  exercisesCompleted: integer('exercises_completed').default(0).notNull(),
  totalXPEarned: integer('total_xp_earned').default(0).notNull(),
  totalTimeSeconds: integer('total_time_seconds').default(0).notNull(),
  averageAccuracy: real('average_accuracy').default(0).notNull(),

  // Timestamps
  startedAt: timestamp('started_at', { mode: 'date' }).defaultNow().notNull(),
  endedAt: timestamp('ended_at', { mode: 'date' }),
}, (table) => ({
  userIdIdx: index('study_sessions_user_id_idx').on(table.userId),
  startedAtIdx: index('study_sessions_started_at_idx').on(table.startedAt),
}));

// ============================================================================
// RELATIONS
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  userProgress: many(userProgress),
  reviewSchedule: many(reviewSchedule),
  userAchievements: many(userAchievements),
  studySessions: many(studySessions),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const exercisesRelations = relations(exercises, ({ many }) => ({
  userProgress: many(userProgress),
  reviewSchedule: many(reviewSchedule),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  exercise: one(exercises, {
    fields: [userProgress.exerciseId],
    references: [exercises.id],
  }),
}));

export const reviewScheduleRelations = relations(reviewSchedule, ({ one }) => ({
  user: one(users, {
    fields: [reviewSchedule.userId],
    references: [users.id],
  }),
  exercise: one(exercises, {
    fields: [reviewSchedule.exerciseId],
    references: [exercises.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const studySessionsRelations = relations(studySessions, ({ one }) => ({
  user: one(users, {
    fields: [studySessions.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Exercise = typeof exercises.$inferSelect;
export type NewExercise = typeof exercises.$inferInsert;

export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;

export type ReviewSchedule = typeof reviewSchedule.$inferSelect;
export type NewReviewSchedule = typeof reviewSchedule.$inferInsert;

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;

export type StudySession = typeof studySessions.$inferSelect;
export type NewStudySession = typeof studySessions.$inferInsert;

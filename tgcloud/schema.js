import { table, integer, text, index, sql } from 'sdk/db';

/**
 * Users table — stores user profiles, chosen language, and usage stats.
 * Notice: No foreign keys declared, as per tgcloud SDK requirements.
 */
export const users = table(
  'users',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tgId: integer('tg_id').unique().notNull(),
    username: text('username'),
    firstName: text('first_name'),
    lang: text('lang').default('en').notNull(),
    requestCount: integer('request_count').default(0).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`(unixepoch())`
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
      sql`(unixepoch())`
    ),
  },
  (t) => ({
    tgIdIdx: index('idx_users_tg_id').on(t.tgId),
  })
);

/**
 * User number search & query history table.
 */
export const userHistory = table(
  'user_history',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tgId: integer('tg_id').notNull(),
    country: text('country').notNull(),
    phoneNumber: text('phone_number').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`(unixepoch())`
    ),
  },
  (t) => ({
    tgIdHistoryIdx: index('idx_history_tg_id').on(t.tgId),
  })
);

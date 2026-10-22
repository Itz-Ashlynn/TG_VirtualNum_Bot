import { db, sql, eq } from 'sdk/db';
import { users, userHistory } from '../schema.js';

/**
 * Fetch or initialize a user profile in SQLite.
 * Returns { id, tgId, username, firstName, lang, requestCount }
 */
export async function getOrInitUser(from) {
  if (!from || !from.id) return null;

  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.tgId, from.id))
      .get();

    if (existing) {
      // Sync username or first_name if changed
      if (
        existing.username !== (from.username || null) ||
        existing.firstName !== (from.first_name || null)
      ) {
        await db
          .update(users)
          .set({
            username: from.username || null,
            firstName: from.first_name || null,
            updatedAt: sql`(unixepoch())`,
          })
          .where(eq(users.tgId, from.id))
          .run();
      }
      return existing;
    }

    // Insert new user
    const newUser = {
      tgId: from.id,
      username: from.username || null,
      firstName: from.first_name || null,
      lang: 'en',
      requestCount: 0,
    };

    await db.insert(users).values(newUser).run();
    return newUser;
  } catch (err) {
    console.error('getOrInitUser error:', err);
    return {
      tgId: from.id,
      username: from.username,
      firstName: from.first_name,
      lang: 'en',
      requestCount: 0,
    };
  }
}

/**
 * Update user language preference.
 */
export async function updateUserLang(tgId, lang) {
  try {
    await db
      .update(users)
      .set({
        lang,
        updatedAt: sql`(unixepoch())`,
      })
      .where(eq(users.tgId, tgId))
      .run();
    return true;
  } catch (err) {
    console.error('updateUserLang error:', err);
    return false;
  }
}

/**
 * Increment request counter and record number query.
 */
export async function recordUserQuery(tgId, country, phoneNumber) {
  try {
    await db.run(
      sql`UPDATE users SET request_count = request_count + 1, updated_at = unixepoch() WHERE tg_id = ${tgId}`
    );

    if (country && phoneNumber) {
      await db
        .insert(userHistory)
        .values({
          tgId,
          country,
          phoneNumber: String(phoneNumber),
        })
        .run();
    }
  } catch (err) {
    console.error('recordUserQuery error:', err);
  }
}

/**
 * Aggregate platform statistics for Mini App & Landing page.
 */
export async function getPlatformStats() {
  try {
    const userCount = await db.$count(users);
    const historyCount = await db.$count(userHistory);
    return {
      totalUsers: userCount || 0,
      totalQueries: historyCount || 0,
    };
  } catch (err) {
    console.error('getPlatformStats error:', err);
    return { totalUsers: 0, totalQueries: 0 };
  }
}

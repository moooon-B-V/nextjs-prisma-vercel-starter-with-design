import { db } from '@/lib/db';

// Truncate every auth-owned table, restarting identity counters and
// cascading FK rows. Cheaper than `migrate reset` and idempotent — each
// test's beforeEach calls this so test ordering doesn't matter.
//
// Add tables here as your application schema grows so tests can reset
// to a known clean state.
export async function truncateAuthTables(): Promise<void> {
  await db.$executeRawUnsafe(
    'TRUNCATE TABLE "session", "account", "verification", "user" RESTART IDENTITY CASCADE',
  );
}

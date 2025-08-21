import { db } from "~/db/index.server";
import { session } from "~/db/schema";
import { toOneWeek } from "~/utils/date";
import { eq } from 'drizzle-orm';

export async function createSession(token: string, userId: number) {
  await db.insert(session).values({
    userId,
    token,
    expiresAt: toOneWeek(),
  }).onConflictDoUpdate({
    target: session.userId,
    set: {
      token,
      expiresAt: toOneWeek(),
    },
  });
}

export async function validateSession(token: string) {
  const sessionData = await db.select().from(session).where(eq(session.token, token));
  if (sessionData.length === 0) {
    throw new Error("Session not found");
  }

  const sessionInfo = sessionData[0];
  if (new Date(sessionInfo.expiresAt) < new Date()) {
    throw new Error("Session expired");
  }

  return sessionInfo.userId;
}

export async function deleteSession(token: string) {
  await db.delete(session).where(eq(session.token, token));
}
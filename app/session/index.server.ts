import bcrypt from "bcryptjs";
import { redirect } from "react-router";
import { createCookie } from "react-router";
import { createSession, deleteSession, validateSession } from "~/services/session.service";

const SESSION_COOKIE_NAME = "session_token";
const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key";

type SessionData = {
  userId: number;
  token: string;
}

export const sessionCookie = createCookie(SESSION_COOKIE_NAME, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week
  secrets: [SESSION_SECRET],
});

export async function createUserSession(userId: number, redirectTo: string) {
  const token = bcrypt.hashSync(`${userId}-${Date.now()}`, 10);

  await createSession(token, userId);

  const cookie = await sessionCookie.serialize({ userId, token });
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

// Set session cookie
export async function setSessionCookie(headers: Headers, token: string) {
  headers.append("Set-Cookie", await sessionCookie.serialize(token));
}

// Get session token
export async function getSessionData(request: Request): Promise<SessionData | null> {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const cookies = await sessionCookie.parse(cookieHeader);
  return cookies
}

export async function validateUserSession(request: Request) {
  const sessionData = await getSessionData(request);
  if (!sessionData) {
    throw new Error("No session token found");
  }
  try {
    const userId = await validateSession(sessionData.token);
    return userId;
  } catch (err) {
    throw new Error("Invalid session token");
  }
}

// Clear session cookie
export async function clearSessionCookie(request: Request) {
  const sessionData = await getSessionData(request);
  if (!sessionData) return;

  request.headers.append("Set-Cookie", await sessionCookie.serialize("", { maxAge: 0 }));
  await deleteSession(sessionData.token);
}
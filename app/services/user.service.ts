import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "~/db/index.server";
import { user } from "~/db/schema";

export async function loginUser(email: string, password: string) {
  // Find user in database
  const userLogged = await db.select().from(user).where(eq(user.email, email));

  if (userLogged.length !== 1) {
    throw new Error("Invalid email or password");
  }

  // Check hashed password
  if (!(await bcrypt.compare(password, userLogged[0].passwordHash))) {
    throw new Error("Invalid email or password");
  }

  // Create session and return user ID
  return { userId: userLogged[0].id };
}

export async function createUser({ username, email, password }: { username: string, email: string; password: string }) {
  // Check if user already exists
  const existingUser = await db.select().from(user).where(eq(user.email, email));
  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.insert(user).values({ username, email, passwordHash: hashedPassword, createdAt: new Date() }).returning().then(rows => rows[0]);
  return { id: newUser.id, email };
}
import { type ActionFunction, Form } from "react-router";
import type { Route } from "./+types/login";
import { createUserSession } from "~/session/index.server";
import { db } from "~/db/index.server";
import { user } from "~/db/schema";
import { eq } from 'drizzle-orm';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const userLogged = await db.select().from(user).where(eq(user.email, email))
    return createUserSession(userLogged[0].id, "/dashboard");
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export default function LoginPage({
  actionData,
}: Route.ComponentProps) {
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Login</h1>
      <Form method="post">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoFocus
            autoComplete="username"
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {actionData?.error && (
          <div style={{ color: "red", marginTop: 12 }}>{actionData.error}</div>
        )}
        <button
          type="submit"
          style={{ marginTop: 16 }}
        >
          Login
        </button>
      </Form>
      <p style={{ marginTop: 16 }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
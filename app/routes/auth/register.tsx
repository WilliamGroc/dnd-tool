import { type ActionFunctionArgs, Form } from "react-router";
import type { Route } from "./+types/register";
import { createUser } from "~/services/user.service";
import { createUserSession } from "~/session/index.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: "Passwords do not match" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (password.length < 8) {
    return new Response(JSON.stringify({ error: "Password must be at least 8 characters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const userLogged = await createUser({ username, email, password });
    return createUserSession(userLogged.id, "/dashboard");
  } catch (err) {
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default function Register({
  actionData,
}: Route.ComponentProps) {

  return (
    <div className="register-container" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Register</h1>
      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" required autoFocus />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoFocus />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required minLength={8} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
        </div>
        {actionData?.error && (
          <div style={{ color: "red", marginTop: 8 }}>{actionData.error}</div>
        )}
        <button type="submit">
          Register
        </button>
      </Form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

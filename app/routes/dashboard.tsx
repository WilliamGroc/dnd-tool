import { eq } from "drizzle-orm";
import { type ActionFunction, redirect, useLoaderData, Form, Link } from "react-router";
import { db } from "~/db/index.server";
import { journey } from "~/db/schema";
import { validateUserSession } from "~/session/index.server";

type Journey = {
  id: number;
  name: string;
  description: string;
};

export async function loader({ request }: { request: Request }) {
  const userId = await validateUserSession(request);

  const journeys = await db.select().from(journey).where(eq(journey.userId, userId));
  return { journeys };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await validateUserSession(request);

  if (!userId) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const name = formData.get("name") as string;

  if (!name.trim()) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await db.insert(journey).values({ name, startDate: new Date(), userId });
  return redirect("/dashboard");
};

export default function Dashboard() {
  const { journeys } = useLoaderData<{ journeys: Journey[] }>();

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h1>Dashboard</h1>
      <section>
        <Link to="/dashboard/journey/creation" className="text-blue-600 hover:underline">
          Create New Journey
        </Link>
      </section>
      <section>
        <h2>Journeys</h2>
        {journeys.length === 0 ? (
          <p>No journeys yet.</p>
        ) : (
          <ul>
            {journeys.map(journey => (
              <li key={journey.id} style={{ marginBottom: 12 }}>
                <Link to={`/dashboard/journey/${journey.id}`}><strong>{journey.name}</strong></Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

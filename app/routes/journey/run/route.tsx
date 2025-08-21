import { redirect, type LoaderFunctionArgs } from "react-router";
import { db } from "~/db/index.server";
import { getSessionData } from "~/session/index.server";
import type { Route } from "./+types/route";
import { creature, journey, playerCharacter, quest } from "~/db/schema";
import { and, eq } from "drizzle-orm";

// Mock loader for current running journey
export async function loader({ request, params }: LoaderFunctionArgs
) {
  const session = await getSessionData(request);
  const journeyId = params.journeyId;

  if (!journeyId) {
    return redirect("/dashboard");
  }

  if (!session) {
    return redirect("/login");
  }

  // Simulate fetching the current journey from the database
  const journeyData = await db.select()
    .from(journey)
    .where(and(eq(journey.userId, session.userId), eq(journey.id, Number(journeyId))))

  const charactersData = await db.select().from(playerCharacter).where(eq(playerCharacter.journeyId, Number(journeyId)));
  const questsData = await db.select().from(quest).where(eq(quest.journeyId, Number(journeyId)));
  const monstersData = await db.select().from(creature).where(eq(creature.journeyId, Number(journeyId)));

  if (!journeyData) {
    return redirect("/dashboard");
  }

  return { journeyData: journeyData[0], charactersData, questsData, monstersData };
};

export default function RunningJourneyPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-2">Journey</h2>
        <pre className="bg-gray-100 rounded p-4 overflow-x-auto dark:text-gray-800">{JSON.stringify(loaderData.journeyData, null, 2)}</pre>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Characters</h2>
        <div className="flex gap-4 flex-wrap">
          {loaderData.charactersData.map((character: any) => (
            <div
              key={character.id}
              className="border border-gray-300 rounded-lg p-4 min-w-[150px] bg-gray-50 dark:text-gray-800"
            >
              <strong>{character.name}</strong>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Quests</h2>
        <div className="flex gap-4 flex-wrap">
          {loaderData.questsData.map((quest: any) => (
            <div
              key={quest.id}
              className="border border-gray-300 rounded-lg p-4 min-w-[150px] bg-gray-50 dark:text-gray-800"
            >
              <strong>{quest.title}</strong>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Monsters</h2>
        <div className="flex gap-4 flex-wrap">
          {loaderData.monstersData.map((monster: any) => (
            <div
              key={monster.id}
              className="border border-gray-300 rounded-lg p-4 min-w-[150px] bg-gray-50 dark:text-gray-800"
            >
              <strong>{monster.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
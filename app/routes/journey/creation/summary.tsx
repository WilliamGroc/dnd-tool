import type { JourneyFormData } from "./journeyForm";
import type { MonsterFormData } from "./monsterForm";
import type { QuestFormData } from "./questForm";
import type { CharacterFormData } from "./characterForm";

type Props = {
  characters: Record<string, CharacterFormData>;
  journey: JourneyFormData;
  monsters: Record<string, MonsterFormData>;
  quests: Record<string, QuestFormData>;
};

export const Summary = ({
  characters,
  journey,
  monsters,
  quests,
}: Props) => (
  <div>
    <h1>Journey Summary</h1>
    <section>
      <h2>Journey</h2>
      <p>
        <strong>{journey.name}</strong>
      </p>
    </section>

    <section>
      <h2>Characters</h2>
      <ul>
        {Object.values(characters).map((char) => (
          <li key={char.name}>
            {char.name} (Level {char.level} {char.characterClass})
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2>Monsters</h2>
      <ul>
        {Object.values(monsters).map((monster) => (
          <li key={monster.name}>
            {monster.name} - HP: {monster.hp}, AC: {monster.armorClass}
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2>Quests</h2>
      <ul>
        {Object.values(quests).map((quest) => (
          <li key={quest.title}>
            <strong>{quest.title}</strong>: {quest.description} (Reward: {quest.reward})
          </li>
        ))}
      </ul>
    </section>
  </div>
);
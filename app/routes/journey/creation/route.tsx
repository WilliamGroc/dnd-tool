import React, { useState } from "react";
import { redirect, useSubmit, type ActionFunctionArgs } from "react-router";
import { JourneyForm, type JourneyFormData } from "./journeyForm";
import { QuestForm, type QuestFormData } from "./questForm";
import type { CharacterFormData } from "./characterForm";
import CharacterForm from "./characterForm";
import type { MonsterFormData } from "./monsterForm";
import MonsterForm from "./monsterForm";
import { Summary } from "./summary";
import { db } from "~/db/index.server";
import { creature, journey, playerCharacter, quest } from "~/db/schema";
import { getSessionData } from "~/session/index.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSessionData(request);

  if (!session) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const journeyData = formData.get("journeyData");
  if (journeyData) {

    const parsedData = JSON.parse(journeyData as string);

    await db.transaction(async (tx) => {
      const journeyId = await tx.insert(journey).values({
        name: parsedData.journey.name,
        userId: session.userId,
      }).returning().then((res) => res[0].id);

      await tx.insert(playerCharacter).values(
        parsedData.characters.map((character: CharacterFormData) => ({
          name: character.name,
          characterClass: character.characterClass,
          level: character.level,
          journeyId,
          race: character.race,
          experience: character.experience,
          speed: character.speed,
          maxHp: character.maxHp,
          currentHp: character.maxHp, // Assuming current HP starts at max HP
          strength: character.abilities.strength,
          dexterity: character.abilities.dexterity,
          constitution: character.abilities.constitution,
          intelligence: character.abilities.intelligence,
          wisdom: character.abilities.wisdom,
          charisma: character.abilities.charisma,
        }))
      );

      await tx.insert(quest).values(
        parsedData.quests.map((quest: QuestFormData) => ({
          title: quest.title,
          description: quest.description,
          reward: quest.reward,
          journeyId,
        }))
      );

      await tx.insert(creature).values(
        parsedData.monsters.map((monster: MonsterFormData) => ({
          name: monster.name,
          hp: monster.hp,
          armorClass: monster.armorClass,
          strength: monster.abilities.strength,
          dexterity: monster.abilities.dexterity,
          constitution: monster.abilities.constitution,
          intelligence: monster.abilities.intelligence,
          wisdom: monster.abilities.wisdom,
          charisma: monster.abilities.charisma,
          journeyId,
        }))
      );
    })

    // Here you would typically save the data to a database or perform some action
  }
  return redirect("/dashboard"); // Return a response or redirect as needed
}

const STEPS = {
  JOURNEY: 0,
  QUEST: 1,
  CHARACTER: 2,
  MONSTER: 3,
  SUMMARY: 4,
};

const Paginator = ({ handleBack, handleNext }: { handleBack?: () => void, handleNext?: () => void }) => {
  return <div className="flex space-x-2">
    {handleBack && (
      <button type="button" onClick={handleBack}>
        Back
      </button>
    )}
    {handleNext && (
      <button type="button" onClick={handleNext}>
        Next
      </button>
    )}
  </div>
}

export default function JourneyCreation() {
  const [step, setStep] = useState(0);
  const submit = useSubmit();

  const [journey, setJourneyData] = useState<JourneyFormData>({
    name: "",
  });

  // User Character State
  const [characters, setCharacters] = useState<Record<string, CharacterFormData>>({});

  // Quest State
  const [quests, setQuests] = useState<Record<string, QuestFormData>>({});

  // Monster State
  const [monsters, setMonsters] = useState<Record<string, MonsterFormData>>({
  });

  const handleJourneyChange = (data: { name: string }) => {
    setJourneyData(data);
  }

  const handleCharacterAdd = (e: CharacterFormData) => {
    setCharacters({ ...characters, [e.name]: e });
  };

  const handleQuestAdd = (e: QuestFormData) => {
    setQuests({ ...quests, [e.title]: e });
  };

  const handleMonsterAdd = (e: MonsterFormData) => {
    setMonsters({ ...monsters, [e.name]: e });
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    const journeyData = {
      journey,
      characters: Object.values(characters),
      quests: Object.values(quests),
      monsters: Object.values(monsters),
    };
    console.log("Journey Data:", journeyData);
    const formData = new FormData();
    formData.append("journeyData", JSON.stringify(journeyData));
    submit(formData, { method: "post" });
    alert("Journey Created!");
  };

  const removeCharacter = (name: string) => {
    const newCharacters = { ...characters };
    delete newCharacters[name];
    setCharacters(newCharacters);
  };

  const removeQuest = (title: string) => {
    const newQuests = { ...quests };
    delete newQuests[title];
    setQuests(newQuests);
  };

  const removeMonster = (name: string) => {
    const newMonsters = { ...monsters };
    delete newMonsters[name];
    setMonsters(newMonsters);
  };

  const gotoStep = (step: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (step < 0 || step >= Object.keys(STEPS).length) return;
      setStep(step);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1, margin: "0 auto" }}>
        <h1>Journey Creation</h1>
        <p>Step {step + 1} of {Object.keys(STEPS).length}</p>

        <div>
          <h1><a className="cursor-pointer" onClick={gotoStep(STEPS.JOURNEY)}>Journey</a></h1>
          <div>{journey.name}</div>
        </div>
        <div>
          <h1><a className="cursor-pointer" onClick={gotoStep(STEPS.QUEST)}>Quests</a></h1>
          <ul>
            {Object.values(quests).map((quest) => (
              <li key={quest.title}>
                <strong>{quest.title}</strong>: {quest.description} (Reward: {quest.reward}) <a className="text-red-500 cursor-pointer" onClick={() => removeQuest(quest.title)}>x</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1><a className="cursor-pointer" onClick={gotoStep(STEPS.CHARACTER)}>Characters</a></h1>
          <ul>
            {Object.values(characters).map((char) => (
              <li key={char.name}>
                {char.name} (Level {char.level} {char.characterClass}) <a className="text-red-500 cursor-pointer" onClick={() => removeCharacter(char.name)}>x</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1><a className="cursor-pointer" onClick={gotoStep(STEPS.MONSTER)}>Monsters</a></h1>
          <ul>
            {Object.values(monsters).map((monster) => (
              <li key={monster.name}>
                {monster.name} <a className="text-red-500 cursor-pointer" onClick={() => removeMonster(monster.name)}>x</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1><a className="cursor-pointer" onClick={gotoStep(STEPS.SUMMARY)}>Summary</a></h1>
        </div>
      </div>
      <div style={{ flex: 3, margin: "0 auto" }}>
        <div>
          {step === STEPS.JOURNEY && (
            <div>
              <h2>Journey</h2>
              <JourneyForm onSave={handleJourneyChange} />
              <br />
              <Paginator handleNext={handleNext} />
            </div>
          )}

          {step === STEPS.QUEST && (
            <div>
              <QuestForm onAdd={handleQuestAdd} />
              <br />
              <Paginator handleBack={handleBack} handleNext={handleNext} />
            </div>
          )}

          {step === STEPS.CHARACTER && (
            <div>
              <CharacterForm onAdd={handleCharacterAdd} />
              <br />
              <Paginator handleBack={handleBack} handleNext={handleNext} />
            </div>
          )}

          {step === STEPS.MONSTER && (
            <div>
              <MonsterForm onAdd={handleMonsterAdd} />
              <br />
              <Paginator handleBack={handleBack} handleNext={handleNext} />
            </div>
          )}

          {step === STEPS.SUMMARY && (
            <div>
              <Summary
                characters={characters}
                journey={journey}
                monsters={monsters}
                quests={quests}
              />
              <br />
              <div className="flex justify-between">
                <button type="button" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" onClick={handleSubmit}>
                  Submit Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
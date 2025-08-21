import React from "react";

export type MonsterFormData = {
  name: string;
  hp: number;
  armorClass: number;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
};

type MonsterFormProps = {
  onAdd?: (data: MonsterFormData) => void;
};

export default function MonsterForm({ onAdd }: MonsterFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const data: MonsterFormData = {
      name: formData.get("name") as string,
      hp: Number(formData.get("hp")) || 0,
      armorClass: Number(formData.get("armorClass")) || 0,
      abilities: {
        strength: Number(formData.get("strength")) as number || 0,
        dexterity: Number(formData.get("dexterity")) as number || 0,
        constitution: Number(formData.get("constitution")) as number || 0,
        intelligence: Number(formData.get("intelligence")) as number || 0,
        wisdom: Number(formData.get("wisdom")) as number || 0,
        charisma: Number(formData.get("charisma")) as number || 0,
      }
    };
    onAdd?.(data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2>Create a New Monster</h2>
      <div>
        <label className="block font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="border rounded px-2 py-1 w-full"
          id="name"
          name="name"
          required
        />
      </div>
      <div>
        <label className="block font-semibold" htmlFor="hp">
          HP
        </label>
        <input
          className="border rounded px-2 py-1 w-full"
          id="hp"
          name="hp"
          type="number"
          min={0}
          required
        />
      </div>
      <div>
        <label className="block font-semibold" htmlFor="armorClass">
          Armor Class
        </label>
        <input
          className="border rounded px-2 py-1 w-full"
          id="armorClass"
          name="armorClass"
          type="number"
          min={0}
          required
        />
      </div>
      <div>
        <label className="block font-medium">Abilities</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm">Strength</label>
            <input
              type="number"
              name="strength"
              min={1}
              max={30}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm">Dexterity</label>
            <input
              type="number"
              name="dexterity"
              min={1}
              max={30}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm">Constitution</label>
            <input
              type="number"
              name="constitution"
              min={1}
              max={30}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm">Intelligence</label>
            <input
              type="number"
              name="intelligence"
              min={1}
              max={30}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm">Wisdom</label>
            <input
              type="number"
              name="wisdom"
              min={1}
              max={30}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm">Charisma</label>
            <input
              type="number"
              name="charisma"
              min={1}
              max={30}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Monster
      </button>
    </form>
  );
}
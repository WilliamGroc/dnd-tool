interface CharacterFormProps {
  onAdd: (data: CharacterFormData) => void;
}

export interface CharacterFormData {
  name: string;
  race: string;
  characterClass: string;
  level: number;
  experience: number;
  speed: number;
  maxHp: number;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

const races = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Tiefling"];
const classes = ["Fighter", "Wizard", "Rogue", "Cleric", "Ranger", "Paladin"];

export default function CharacterForm({
  onAdd,
}: CharacterFormProps) {

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const data: CharacterFormData = {
      name: formData.get("name") as string,
      race: formData.get("race") as string,
      characterClass: formData.get("characterClass") as string,
      level: Number(formData.get("level")) as number || 1,
      experience: 0,
      speed: Number(formData.get("speed")) as number || 0,
      maxHp: Number(formData.get("maxHp")) as number || 0,
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-4">
      <h2>Create a New Character</h2>
      <div>
        <label className="block font-medium">Name</label>
        <input
          name="name"
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Race</label>
        <select
          name="race"
          required
          className="select select-bordered w-full"
        >
          <option value="">Select race</option>
          {races.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Class</label>
        <select
          name="characterClass"
          required
          className="select select-bordered w-full"
        >
          <option value="">Select class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Level</label>
        <input
          type="number"
          name="level"
          min={1}
          max={20}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Speed</label>
        <input
          type="number"
          name="speed"
          min={0}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Max HP</label>
        <input
          type="number"
          name="maxHp"
          min={1}
          required
          className="input input-bordered w-full"
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
      <button type="submit" className="btn btn-primary w-full">
        Add Character
      </button>
    </form>
  );
}
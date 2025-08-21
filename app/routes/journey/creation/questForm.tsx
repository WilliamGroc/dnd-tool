import React from "react";

export type QuestFormData = {
  title: string;
  description: string;
  reward: string;
};

type Props = {
  onAdd?: (data: QuestFormData) => void;
}

export function QuestForm({ onAdd }: Props) {
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const data: QuestFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      reward: formData.get("reward") as string,
    };
    onAdd?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2>Create a New Quest</h2>
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          maxLength={100}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          maxLength={500}
          className="input input-bordered w-full"
        />

      </div>
      <div>
        <label htmlFor="reward" className="block font-medium">
          Reward
        </label>
        <input
          id="reward"
          type="text"
          name="reward"
          maxLength={100}
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit">Add Quest</button>
    </form>
  );
}
import React from "react";

interface JourneyFormProps {
  onSave?: (data: JourneyFormData) => void;
}

export interface JourneyFormData {
  name: string;
}

export const JourneyForm: React.FC<JourneyFormProps> = ({ onSave }) => {
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const data: JourneyFormData = {
      name: formData.get("name") as string,
    };
    onSave?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name">Journey Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
        />
      </div>
      <button type="submit">Save Journey</button>
    </form>
  );
};
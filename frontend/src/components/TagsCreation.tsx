import { useState } from "react";
import { TagType } from "../types";
import axios from "axios";

export const TagCreation = (props: { onCreateTag(id: number): void }) => {
  const [name, setName] = useState<string>();

  const createNewTag = async () => {
    try {
      const result = await axios.post<TagType>(
        `http://localhost:3000/api/tags`,
        {
          name,
        }
      );
      if (result.status === 200) {
        console.log(result.data.id);
        setName("");
        props.onCreateTag(result.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={createNewTag}>
        Créer un nouveau tag
      </button>
    </div>
  );
};

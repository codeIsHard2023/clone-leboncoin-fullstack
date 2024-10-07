import { useState } from "react";
import { CategoryType } from "../types";
import axios from "axios";

export const CategoryCreation = (props: {
  onCreateCateg(id: number): void;
}) => {
  const [name, setName] = useState<string>();

  const createNewCategory = async () => {
    try {
      const result = await axios.post<CategoryType>(
        `http://localhost:3000/api/categories`,
        {
          name,
        }
      );
      if (result.status === 200) {
        console.log(result.data.id);
        setName("");
        props.onCreateCateg(result.data.id);
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
      <button type="button" onClick={createNewCategory}>
        Créer une nouvelle catégorie
      </button>
    </div>
  );
};

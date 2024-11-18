import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../api/categories";

export const CategoryCreation = (props: {
  onCreateCateg(id: number): void;
}) => {
  const [name, setName] = useState<string>();

  const [doCreateCatgory, { error }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
  });

  const createNewCategory = async () => {
    const {
      data: { createCategory },
    } = await doCreateCatgory({
      variables: {
        data: {
          name,
        },
      },
    });
    if (createCategory) {
      console.log(createCategory.id);
      setName("");
      props.onCreateCateg(createCategory.id);
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

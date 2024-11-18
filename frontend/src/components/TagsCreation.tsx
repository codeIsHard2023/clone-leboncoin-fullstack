import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TAG, GET_TAGS } from "../api/tags";

export const TagCreation = (props: { onCreateTag(id: number): void }) => {
  const [name, setName] = useState<string>("");

  const [doCreatTag, { error }] = useMutation(CREATE_TAG, {
    refetchQueries: [GET_TAGS],
  });

  const createNewTag = async () => {
    if (!name?.trim()) return;
    const { data: createTag } = await doCreatTag({
      variables: { data: { name } },
    });
    if (createTag.name) {
      console.log(createTag.name);
      setName("");
      props.onCreateTag(createTag.name);
    }
  };
  if (error) return <p>{`Error! ${error?.message}`}</p>;

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Tag name"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={createNewTag} disabled={!name?.trim()}>
        Créer un nouveau tag
      </button>
    </div>
  );
};

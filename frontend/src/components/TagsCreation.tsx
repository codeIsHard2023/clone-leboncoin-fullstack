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
    const { data } = await doCreatTag({
      variables: { data: { name } },
    });
    if (data?.createTag.name) {
      setName("");
      props.onCreateTag(Number(data?.createTag.id));
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

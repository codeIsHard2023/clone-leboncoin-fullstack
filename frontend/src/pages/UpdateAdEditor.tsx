import { useQuery } from "@apollo/client";
import { GET_AD } from "../api/ads";
import { CreateUpdateForm } from "../components/CreateUpdateForm";
import { useParams } from "react-router-dom";

export const UpdateAdEditor = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data } = useQuery(GET_AD, {
    variables: { adId: `${id}` },
  });

  const ad = data?.ad;

  return <>{ad && <CreateUpdateForm ad={ad} />}</>;
};

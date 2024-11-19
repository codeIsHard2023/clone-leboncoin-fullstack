import { useQuery } from "@apollo/client";
import { GET_AD } from "../api/ads";
import { CreateUpdateForm } from "../components/createUpdateForm";
import { useParams } from "react-router-dom";
import { AdType } from "../types";

export const UpdateAdEditor = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data } = useQuery<{ ad: AdType }>(GET_AD, {
    variables: { adId: id },
  });

  const ad = data?.ad;

  return <>{ad && <CreateUpdateForm ad={ad} />}</>;
};

import { useParams } from "react-router-dom";

export const AdDetails = () => {
  const { id } = useParams<string>();

  return <p>Hello from AdDetails {id}</p>;
};

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AdProps } from "../components/AdCard";

export const AdDetails = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [ad, setAd] = useState<AdProps>();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (id) {
          const result = await axios.get<AdProps>(
            `http://localhost:3000/api/ads/${id}`
          );
          setAd(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    dataFetch();
  }, [id]);

  if (ad === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h3>{ad.title}</h3>
    </div>
  );
};

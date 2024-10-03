import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdCard } from "../components/AdCard";
import { AdType } from "../types";
import axios from "axios";

export const CategoryAds = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryAds, setCategoryAds] = useState<AdType[]>();
  const [categoryName, setCategoryName] = useState<string>();

  useEffect(() => {
    if (id !== undefined) {
      setCategoryId(parseInt(id));
    } else {
      setCategoryId(null);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryId) {
          const result = await axios.get(
            `http://localhost:3000/api/categories/${categoryId}/ads`
          );
          setCategoryAds(result.data[0].ads);
          setCategoryName(result.data[0].name);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (categoryId !== null) {
      try {
        fetchData();
      } catch (e) {
        console.error(e);
      }
    }
  }, [categoryId]);

  return (
    <>
      {categoryAds && categoryAds.length > 0 ? (
        categoryAds.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            picture={ad.picture}
            title={ad.title}
            price={ad.price / 100}
            owner={ad.owner}
            description={ad.description}
            location={ad.location}
            category={ad.category}
            onAddToCard={() => "ok"}
          />
        ))
      ) : (
        <p>{`Rien trouvé dans catégorie ${categoryName}`}</p>
      )}
    </>
  );
};

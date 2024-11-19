import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdCard } from "../components/AdCard";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_ADS } from "../api/categories";

export const CategoryAds = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data, loading, error } = useQuery(GET_CATEGORY_ADS, {
    variables: { categoryId: `${categoryId}` },
    skip: categoryId === null,
  });

  const categoryName = data?.category?.name;
  const categoryAds = data?.category?.ads;

  useEffect(() => {
    if (id !== undefined) {
      setCategoryId(parseInt(id));
    } else {
      setCategoryId(null);
    }
  }, [id]);

  if (error) return <p>{`Error! ${error.message}`}</p>;
  return (
    <>
      {loading && <p>Chargement en cours</p>}
      {categoryAds && categoryAds.length > 0 ? (
        categoryAds.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            picture={ad.picture}
            title={ad.title}
            price={ad.price / 100}
            owner={ad.owner}
            location={ad.location}
            onAddToCard={() => console.log("added")}
          />
        ))
      ) : (
        <p>{`Rien trouvé dans catégorie ${categoryName}`}</p>
      )}
    </>
  );
};

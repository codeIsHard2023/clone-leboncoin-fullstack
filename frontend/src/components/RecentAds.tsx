import { useEffect, useState } from "react";
import { AdCard, AdProps } from "./AdCard";

const getAds = async (): Promise<AdProps[]> => {
  return [
    {
      id: 1,
      imgUrl: "/images/table.webp",
      price: 20,
      title: "Table",
    },
    {
      id: 2,
      imgUrl: "images/dame-jeanne.webp",
      title: "Dame-jeanne",
      price: 75,
    },
    {
      id: 3,
      imgUrl: "/images/vide-poche.webp",
      title: "Vide-poche",
      price: 4,
    },
    {
      id: 4,
      imgUrl: "/images/vaisselier.webp",
      title: "Vaisselier",
      price: 100,
    },
    {
      id: 5,
      imgUrl: "images/bougie.webp",
      title: "Bougie",
      price: 8,
    },
    {
      id: 6,
      imgUrl: "/images/porte-magazine.webp",
      title: "Porte-magazine",
      price: 45,
    },
  ];
};

export const RecentAds = () => {
  const [ads, setAds] = useState<AdProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getAds().then((newAds) => {
      setAds(newAds);
    });
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total price : {totalPrice}</p>
      <section className="recent-ads">
        {ads &&
          ads.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              imgUrl={ad.imgUrl}
              title={ad.title}
              price={ad.price}
              onAddToCard={() => setTotalPrice(totalPrice + ad.price)}
            />
          ))}
      </section>
    </>
  );
};

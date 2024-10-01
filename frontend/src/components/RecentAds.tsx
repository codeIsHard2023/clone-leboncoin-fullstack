import { AdCard, AdProps } from "./AdCard";

export const RecentAds = () => {
  const ads: AdProps[] = [
    {
      id: 1,
      imgUrl: "/images/table.webp",
      price: 20,
      title: "Table",
    },
    {
      id: 1,
      imgUrl: "images/dame-jeanne.webp",
      title: "Dame-jeanne",
      price: 75,
    },
    {
      id: 1,
      imgUrl: "/images/vide-poche.webp",
      title: "Vide-poche",
      price: 4,
    },
    {
      id: 1,
      imgUrl: "/images/vaisselier.webp",
      title: "Vaisselier",
      price: 100,
    },
    {
      id: 1,
      imgUrl: "images/bougie.webp",
      title: "Bougie",
      price: 8,
    },
    {
      id: 1,
      imgUrl: "/images/porte-magazine.webp",
      title: "Porte-magazine",
      price: 45,
    },
  ];
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            imgUrl={ad.imgUrl}
            title={ad.title}
            price={ad.price}
          />
        ))}
      </section>
    </>
  );
};

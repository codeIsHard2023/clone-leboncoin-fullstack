import { useEffect, useState } from "react";
import { AdCard, AdProps } from "./AdCard";
import classes from "./RecentAds.module.css";
import axios from "axios";

export const RecentAds = () => {
  const [ads, setAds] = useState<AdProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdProps[]>(
          "http://localhost:3000/api/ads"
        );
        setAds(result.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <div className={classes.cart}>
        <span style={{ textAlign: "left" }}>Total price : {totalPrice}</span>
        <button className={classes.button} onClick={() => setTotalPrice(0)}>
          Vider le panier
        </button>
      </div>
      <section className={classes.recentAds}>
        {ads &&
          ads.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              picture={ad.picture}
              title={ad.title}
              price={ad.price / 100}
              onAddToCard={() => setTotalPrice(totalPrice + ad.price / 100)}
            />
          ))}
      </section>
    </>
  );
};

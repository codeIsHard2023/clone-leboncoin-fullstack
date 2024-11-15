import { useQuery } from "@apollo/client";
import { AdCard } from "./AdCard";
import classes from "./RecentAds.module.css";
import { GET_ADS } from "../api/ads";
import { useState } from "react";
import { AdType } from "../types";

export const RecentAds = () => {
  const { data, loading, error } = useQuery(GET_ADS, {
    fetchPolicy: "cache-and-network",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const ads = data?.ads as AdType[];

  if (error) return <p>{`Error! ${error.message}`}</p>;
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
        {loading && <p>Chargement en cours</p>}
        {ads &&
          ads.map((ad) => (
            <AdCard
              key={ad.id}
              id={ad.id}
              picture={ad.picture}
              title={ad.title}
              price={ad.price / 100}
              description={ad.description}
              owner={ad.owner}
              location={ad.location}
              category={ad.category}
              onAddToCard={() => setTotalPrice(totalPrice + ad.price / 100)}
            />
          ))}
      </section>
    </>
  );
};

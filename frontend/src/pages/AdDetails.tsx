import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AdType } from "../types";
import classes from "./AdDetails.module.css";

export const AdDetails = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [ad, setAd] = useState<AdType>();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (id) {
          const result = await axios.get<AdType>(
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

  const deleteAdt = async () => {
    try {
      const result = await axios.delete<AdType>(
        `http://localhost:3000/api/ads/${id}`
      );

      if (result.status === 200) {
        navigate("/", { replace: true });
      } else {
        return <p>Suppresion de l'annonces est échouée</p>;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (ad === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <section className={classes.adDetails}>
      <div className={classes.adHeader}>
        <h4>{ad.title}</h4>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/ads/new-ad" className={classes.button} onClick={deleteAdt}>
            Modifier
          </Link>
          <button className={classes.button} onClick={deleteAdt}>
            Supprimer
          </button>
        </div>
      </div>
      <div className={classes.adImageContainer}>
        <img className={classes.adImage} src={ad.picture} alt={ad.title} />
        <span className={classes.dateText}>Date de publication </span>
      </div>
      <div className={classes.adDescContainer}>
        <div>
          <h5>Description</h5>
          <p>{ad.description}</p>
        </div>
        <span>Prix : {ad.price / 100} €</span>
      </div>
      <div>
        Critères
        <div>
          <span>Catégorie</span>
          <Link to="/"> #tag </Link>
        </div>
      </div>
      <div>
        <span>Retrait à {ad.location}</span>
        <div>map</div>
      </div>
      <div className={classes.adOwnerInfo}>
        <span>{ad.owner}</span>
        <button className={classes.button} style={{ marginTop: "1rem" }}>
          Contacter vendeur
        </button>
      </div>
    </section>
  );
};

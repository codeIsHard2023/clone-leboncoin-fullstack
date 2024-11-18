import { Link, useNavigate, useParams } from "react-router-dom";
import { AdType } from "../types";
import classes from "./AdDetails.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_AD, GET_AD } from "../api/ads";
import dayjs from "dayjs";

export const AdDetails = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, loading, error } = useQuery<{ ad: AdType }>(GET_AD, {
    variables: { adId: id },
    fetchPolicy: "cache-and-network",
  });

  const ad = data?.ad;

  const [doDelteAd, { loading: deleteAdLoading }] = useMutation(DELETE_AD);

  const deleteAdt = async () => {
    const { data } = await doDelteAd({
      variables: { adId: id },
    });

    if (data) {
      navigate("/", { replace: true });
    } else {
      return <p>Suppresion de l'annonces est échouée</p>;
    }
  };

  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (deleteAdLoading) return <p>Supression de votre annonce en cours</p>;

  return (
    <section className={classes.adDetails}>
      {loading && <p>Chargement en cours</p>}
      <div className={classes.adHeader}>
        <h4>{ad?.title}</h4>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link to={`/ads/updateAd/${id}`} className={classes.button}>
            Modifier
          </Link>
          <button className={classes.button} onClick={deleteAdt}>
            Supprimer
          </button>
        </div>
      </div>
      <div className={classes.adImageContainer}>
        <img className={classes.adImage} src={ad?.picture} alt={ad?.title} />
        <span className={classes.dateText}>
          Date de publication {dayjs(ad?.createdAt).format("DD/MM/YYYY HH:mm")}
        </span>
      </div>
      <div className={classes.adDescContainer}>
        <div>
          <h5>Description</h5>
          <p>{ad?.description}</p>
        </div>
        <span>Prix : {ad?.price ? ad.price / 100 : 0} €</span>
      </div>
      <div>
        Critères
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ marginTop: "1rem" }}>
            Catégorie : {ad?.category?.name.toLowerCase()}
          </span>
          <div style={{ marginBlock: "1rem" }}>
            {data?.ad.tags &&
              data.ad.tags.map((tag) => {
                return (
                  <Link
                    to="/"
                    key={tag.id}
                    style={{
                      padding: "0.3rem",
                      marginInline: "0.2rem",
                      fontSize: "0.8rem",
                      listStyle: "none",
                      textDecoration: "none",
                      backgroundColor: "#8FBC8F",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  >
                    {" "}
                    {tag.name}{" "}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <span>Retrait à {ad?.location}</span>
        <div>map</div>
      </div>
      <div className={classes.adOwnerInfo}>
        <span>{ad?.owner}</span>
        <button className={classes.button} style={{ marginTop: "1rem" }}>
          Contacter vendeur
        </button>
      </div>
    </section>
  );
};

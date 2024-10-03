import { Link } from "react-router-dom";
import { AdType } from "../types";
import classes from "./AdCard.module.css";

export const AdCard = (
  props: AdType & {
    onAddToCard: () => void;
  }
) => {
  const { id, picture, title, price, onAddToCard } = props;

  return (
    <>
      <div className={classes.adCardContainer}>
        <Link className={classes.adCardLink} to={`/ads/${id}`}>
          <img className={classes.adCardImage} src={picture} alt={title} />
          <div className={classes.adCardText}>
            <div className={classes.adCardTitle}>{title}</div>
            <div className={classes.adCardPrice}>{price} €</div>
          </div>
        </Link>
        <button className={classes.button} onClick={onAddToCard}>
          Ajouter dans le panier
        </button>
      </div>
    </>
  );
};

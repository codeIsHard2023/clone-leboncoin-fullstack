import { Link } from "react-router-dom";
import classes from "./AdCard.module.css";

export type AdProps = {
  id: number;
  imgUrl: string;
  title: string;
  price: number;
};

export const AdCard = (props: AdProps) => {
  const { id, imgUrl, title, price } = props;
  return (
    <>
      <div className={classes.adCardContainer}>
        <Link className={classes.adCardLink} to={`/ads/${id}`}>
          <img className={classes.adCardImage} src={imgUrl} />
          <div className={classes.adCardText}>
            <div className={classes.adCardTitle}>{title}</div>
            <div className={classes.adCardPrice}>{price} €</div>
          </div>
        </Link>
      </div>
    </>
  );
};

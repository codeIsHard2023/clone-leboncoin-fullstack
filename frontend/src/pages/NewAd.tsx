// "tags": [{ "id" : 2 }]

import { useEffect, useState } from "react";
import { Categories } from "../components/Header";
import axios from "axios";
import classes from "./NewAd.module.css";
import { AdProps } from "../components/AdCard";
import { useNavigate } from "react-router-dom";

export const NewAd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("New jean");
  const [description, setDescription] = useState<string>("Jamais porté");
  const [owner, setOwner] = useState<string>("newjean@gmail.com");
  const [price, setPrice] = useState<number>(10000);
  const [picture, setPicture] = useState<string>(
    "https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428614_1280.jpg"
  );
  const [location, setLocation] = useState<string>("Lyon");
  const [categoryId, setCategoryId] = useState<number>();

  const [categories, setCategories] = useState<Categories[]>([]);
  //   const [tags, setTags] = useState<Categories[]>([]);
  //   const [isChecked, setIsCHecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        {
          const result = await axios.get<Categories[]>(
            "http://localhost:3000/api/categories"
          );
          setCategories(result.data);
          if (result.data.length > 0) {
            setCategoryId(result.data[0].id);
          }
        }
        // {
        //   const result = await axios.get<Categories[]>(
        //     "http://localhost:3000/api/tags"
        //   );
        //   setTags(result.data);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const submitForm = async () => {
    const result = await axios.post<AdProps>(`http://localhost:3000/api/ads`, {
      title,
      description,
      owner,
      price,
      picture,
      location,
      category: {
        id: categoryId,
      },
      // "tags": [{ "id" : 2 }]
    });
    if (result.status === 200) {
      const newId = result.data.id;
      navigate(`/ads/${newId}`, { replace: true });
    }
  };

  return (
    <div className={classes.formContainer}>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <label htmlFor="title"> Titre </label>
        <input
          className={classes.textField}
          type="text"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description"> Description </label>
        <textarea
          className={`${classes.textarea}`}
          value={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="owner"> Auteur </label>
        <input
          className={classes.textField}
          type="text"
          value={owner}
          id="owner"
          onChange={(e) => setOwner(e.target.value)}
        />
        <label htmlFor="price"> Price </label>
        <input
          className={classes.textField}
          type="number"
          value={price}
          id="price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label htmlFor="picture"> Image url </label>
        <input
          className={classes.textField}
          type="text"
          value={picture}
          id="picture"
          onChange={(e) => setPicture(e.target.value)}
        />
        <label htmlFor="location"> Ville </label>
        <input
          className={classes.textField}
          type="text"
          value={location}
          id="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="categoryId">Choisissez la catégorie</label>
        <select
          className={classes.textField}
          id="categories"
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* <label>Choisissez les tags correspondants</label>
        <div>
          {tags.map((tag) => (
            <div key={tag.id}>
              <span>{tag.name}</span>
              <input
                type="checkbox"
                name={tag.name}
                id={tag.id.toString()}
                checked={isChecked}
                onClick={() => {
                  setIsCHecked(!isChecked);
                  console.log(isChecked);
                }}
              />
            </div>
          ))}
        </div> */}

        <button className={classes.button}>Créer une nouvelle annonce</button>
      </form>
    </div>
  );
};

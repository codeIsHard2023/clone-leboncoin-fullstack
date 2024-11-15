import { useState } from "react";
import { AdType, CategoryType, TagType } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CategoryCreation } from "../components/CategoryCreation";
import { TagCreation } from "../components/TagsCreation";
import classes from "./NewAd.module.css";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../api/categories";
import { GET_TAGS } from "../api/tags";

export const NewAd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("New jean");
  const [description, setDescription] = useState<string>("Jamais porté");
  const [owner, setOwner] = useState<string>("newjean@gmail.com");
  const [price, setPrice] = useState<number>(10);
  const [picture, setPicture] = useState<string>(
    "https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428614_1280.jpg"
  );
  const [location, setLocation] = useState<string>("Lyon");
  const [categoryId, setCategoryId] = useState<number>();
  const [tagsIds, setTagsIds] = useState<number[]>([]);

  const [showCateg, setShowCateg] = useState(false);
  const [showTag, setShowTag] = useState(false);

  const { data, loading, error } = useQuery<{ categories: CategoryType[] }>(
    GET_CATEGORIES
  );

  const categories = data?.categories;

  const tagsData = useQuery<{ tags: TagType[] }>(GET_TAGS);
  const tags = tagsData.data?.tags;
  const tagsLoading = tagsData.loading;
  const tagsError = tagsData.error;

  const submitForm = async () => {
    try {
      const result = await axios.post<AdType>(`http://localhost:3000/api/ads`, {
        title,
        description,
        owner,
        price: price * 100,
        picture,
        location,
        category: categoryId ? { id: categoryId } : null,
        tags: tagsIds.map((tag) => {
          return { id: tag };
        }),
      });
      if (result.status === 200) {
        const newId = result.data.id;
        navigate(`/ads/${newId}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error || tagsError) {
    return <p>{`Error! ${error?.message || tagsError?.message}`}</p>;
  }
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
          placeholder="Titre d'annonce"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description"> Description </label>
        <textarea
          className={`${classes.textarea}`}
          value={description}
          placeholder="Tapez la déscription ici"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="owner"> Auteur </label>
        <input
          className={classes.textField}
          type="text"
          value={owner}
          placeholder="example@mail.com"
          id="owner"
          onChange={(e) => setOwner(e.target.value)}
        />
        <label htmlFor="price"> Prix en € </label>
        <input
          className={classes.textField}
          type="number"
          value={price}
          placeholder="Prix"
          id="price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label htmlFor="picture"> Image url </label>
        <input
          className={classes.textField}
          type="text"
          value={picture}
          placeholder=""
          id="picture"
          onChange={(e) => setPicture(e.target.value)}
        />
        <label htmlFor="location"> Ville </label>
        <input
          className={classes.textField}
          type="text"
          value={location}
          placeholder="Ville"
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
          {loading && <option>Chargement en cours</option>}
          {categories?.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setShowCateg(!showCateg)}>
          {showCateg ? "Cacher" : "Afficher"}
        </button>
        {showCateg && (
          <CategoryCreation
            onCreateCateg={async (id) => {
              setShowCateg(false);
              // await fetchCatgories(); // mettre à jour suite à la suprresion de la fonction
              setCategoryId(id);
            }}
          />
        )}
        <label>Choisissez les tags correspondants</label>
        <div>
          {tagsLoading && <p>Tags se chargent</p>}
          {tags?.map((tag) => (
            <div key={tag.id}>
              <span>{tag.name}</span>
              <input
                type="checkbox"
                checked={tagsIds.includes(tag.id) === true}
                onChange={() => {
                  if (tagsIds.includes(tag.id) === true) {
                    const newArray = [];
                    for (const entry of tagsIds) {
                      if (entry !== tag.id) {
                        newArray.push(entry);
                      }
                    }
                    setTagsIds(newArray);
                  } else {
                    tagsIds.push(tag.id);

                    const newArray = [];
                    for (const entry of tagsIds) {
                      newArray.push(entry);
                    }
                    setTagsIds(newArray);
                  }
                }}
              />
            </div>
          ))}
          <button type="button" onClick={() => setShowTag(!showTag)}>
            {showTag ? "Cacher" : "Afficher"}
          </button>
          {showTag && (
            <TagCreation
              onCreateTag={async (id) => {
                setShowTag(false);
                // await fetchTags(); à update
                tagsIds.push(id);
                setTagsIds([...tagsIds]);
              }}
            />
          )}
        </div>

        <button className={classes.button}>Créer une nouvelle annonce</button>
      </form>
    </div>
  );
};

import { useEffect, useState } from "react";
import { AdType, CategoryType, TagType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryCreation } from "./CategoryCreation";
import { TagCreation } from "./TagsCreation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../api/categories";
import { GET_TAGS } from "../api/tags";
import { CREATE_AD, UPDATE_AD } from "../api/ads";
import classes from "../pages/NewAd.module.css";

export const CreateUpdateForm = (props: { ad?: AdType }) => {
  const { ad } = props;
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [picture, setPicture] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>();
  const [tagsIds, setTagsIds] = useState<number[]>([]);
  const [showCateg, setShowCateg] = useState(false);
  const [showTag, setShowTag] = useState(false);

  const { data: dataCategories, loading: loadingCategories } = useQuery<{
    categories: CategoryType[];
  }>(GET_CATEGORIES);

  const categories = dataCategories?.categories;

  const { data: dataTags, loading: loadingTags } = useQuery<{
    tags: TagType[];
  }>(GET_TAGS, {
    fetchPolicy: "cache-and-network",
  });

  const tags = dataTags?.tags;

  useEffect(() => {
    if (ad) {
      setTitle(ad.title);
      setDescription(ad.description);
      setOwner(ad.owner);
      setPrice(ad.price / 100);
      setPicture(ad.picture);
      setLocation(ad.location);
      if (ad.category?.id) {
        setCategoryId(ad.category.id);
      }
      if (ad.tags) {
        setTagsIds(ad.tags.map((tag) => tag.id));
      }
    } else {
      setTitle("New title");
      setOwner("NewOwner@gmail.com");
      setPicture(
        "https://cdn.pixabay.com/photo/2016/02/13/13/11/oldtimer-1197800_1280.jpg"
      );
      setLocation("Lyon");
      if (categoryId) {
        setCategoryId(categories && categories[0]?.id);
      }
    }
  }, [ad]);

  useEffect(() => {
    if (categories && categories.length && !categoryId && !ad?.category?.id) {
      setCategoryId(categories[0]?.id);
    }
  }, [categories]);

  const [doUpdateAd, { error: errorUpdate, loading: loadingUpdateAd }] =
    useMutation(UPDATE_AD);

  const [doCreateAd, { loading: loadingCreateAd }] = useMutation(CREATE_AD);

  const submitForm = async () => {
    if (ad) {
      const { data } = await doUpdateAd({
        variables: {
          data: {
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
          },
          adId: ad.id,
        },
      });
      if (!errorUpdate?.message && !loadingUpdateAd) {
        navigate(`/ads/${ad.id}`, { replace: true });
      }
    } else {
      const {
        data: { createAd },
      } = await doCreateAd({
        variables: {
          data: {
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
          },
        },
      });
      if (createAd) {
        const newId: number = parseInt(createAd.id);
        if (!loadingCreateAd) {
          navigate(`/ads/${newId}`, { replace: true });
        }
      }
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
          {loadingCategories && <option>Chargement en cours</option>}
          {categories?.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setShowCateg(!showCateg)}>
          {showCateg ? "Cacher" : "Rajouter une catégorie"}
        </button>
        {showCateg && (
          <CategoryCreation
            onCreateCateg={async (id) => {
              setShowCateg(false);
              setCategoryId(id);
            }}
          />
        )}
        <label>Choisissez les tags correspondants</label>
        <div>
          {loadingTags && <p>Tags se chargent</p>}
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
            {showTag ? "Cacher" : "Rajouter un tag"}
          </button>
          {showTag && (
            <TagCreation
              onCreateTag={async (id) => {
                setShowTag(false);
                tagsIds.push(id);
                setTagsIds([...tagsIds]);
              }}
            />
          )}
        </div>

        <button className={classes.button}>
          {currentUrl.includes("update")
            ? "Mettre à jour l'annonce"
            : "Créer une nouvelle annonce"}
        </button>
      </form>
    </div>
  );
};

import { useEffect, useState } from "react";
import { AdType, CategoryType, TagType } from "../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CategoryCreation } from "./CategoryCreation";
import { TagCreation } from "./TagsCreation";
import classes from "../pages/NewAd.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../api/categories";
import { GET_TAGS } from "../api/tags";
import { GET_AD, UPDATE_AD } from "../api/ads";

export const CreateUpdateForm = () => {
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;
  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    setIsUpdate(currentUrl.includes("update"));
  }, [currentUrl]);
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const {
    data,
    // loading: adLoading,
    // error: adError,
  } = useQuery<{ ad: AdType }>(GET_AD, {
    variables: { adId: id },
  });

  const ad = data?.ad;

  const [title, setTitle] = useState<string>(ad?.title ?? "new title");
  const [description, setDescription] = useState<string>(
    ad?.description ?? "Jamais porté"
  );
  const [owner, setOwner] = useState<string>(ad?.owner ?? "newjean@gmail.com");
  const [price, setPrice] = useState<number>(ad?.price ?? 10);
  const [picture, setPicture] = useState<string>(
    ad?.picture ??
      "https://cdn.pixabay.com/photo/2016/02/13/13/11/oldtimer-1197800_1280.jpg"
  );
  const [location, setLocation] = useState<string>(ad?.location ?? "Lyon");
  const [categoryId, setCategoryId] = useState<number>();
  const [tagsIds, setTagsIds] = useState<number[]>([]);

  const [showCateg, setShowCateg] = useState(false);
  const [showTag, setShowTag] = useState(false);

  const {
    data: dataCategories,
    loading: loadingCategories,
    // error: errorCategories,
  } = useQuery<{ categories: CategoryType[] }>(GET_CATEGORIES);

  const categories = dataCategories?.categories;

  const {
    data: dataTags,
    loading: loadingTags,
    // error: errorTags,
  } = useQuery<{ tags: TagType[] }>(GET_TAGS, {
    fetchPolicy: "cache-and-network",
  });

  const tags = dataTags?.tags;

  useEffect(() => {
    if (categories && categories.length && !categoryId) {
      setCategoryId(categories[0]?.id);
    }
  }, [categories]);

  const [doUpdateAd, { loading: loadingUpdateAd, error: errorUpdate }] =
    useMutation(UPDATE_AD);

  const submitForm = async () => {
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
        adId: id,
      },
    });
    if (!errorUpdate?.message && !loadingUpdateAd) {
      navigate(`/ads/${id}`, { replace: true });
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
              // await fetchCatgories(); // mettre à jour suite à la suprresion de la fonction
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
                // await fetchTags(); à update
                tagsIds.push(id);
                setTagsIds([...tagsIds]);
              }}
            />
          )}
        </div>

        <button className={classes.button}>
          {currentUrl.includes("updateAd")
            ? "Mettre à jour l'annonce"
            : "Créer une nouvelle annonce"}
        </button>
      </form>
    </div>
  );
};

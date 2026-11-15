import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ recipe }) {
  const {
    favorites,
    isLoading,
    loadError,
    isUpdating,
    toggleFavorite,
  } = useContext(FavoritesContext);

  const isFavorite = favorites.some(
    (favorite) => favorite.recipeId === recipe.id
  );

  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.name} loading="lazy" />

      <div className="recipe-card-content">
        <h2>{recipe.name}</h2>
        <p>Virtuvė: {recipe.cuisine}</p>

        <Link to={`/recipe/${recipe.id}`}>
          Peržiūrėti receptą
        </Link>

        <button
          className="favorite-button"
          type="button"
          aria-pressed={isFavorite}
          disabled={isLoading || Boolean(loadError) || isUpdating}
          onClick={() => toggleFavorite(recipe)}
        >
          {isLoading
            ? "Kraunami mėgstamiausi..."
            : isFavorite
              ? "Pašalinti iš mėgstamiausių"
              : "Pridėti į mėgstamiausius"}
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;
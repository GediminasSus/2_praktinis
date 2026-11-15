import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function FavoriteButton({ recipe }) {
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
  );
}

export default FavoriteButton;
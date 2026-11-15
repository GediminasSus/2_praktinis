import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const { favorites, isLoading, loadError } =
    useContext(FavoritesContext);

  return (
    <section>
      <h1>Mėgstamiausi receptai</h1>

      {isLoading && (
        <p role="status">Kraunami mėgstamiausi receptai...</p>
      )}

      {!isLoading && !loadError && (
        <>
          {favorites.length === 0 ? (
            <p>Mėgstamiausių receptų dar nėra.</p>
          ) : (
            <div className="recipe-grid">
              {favorites.map((favorite) => (
                <RecipeCard
                  key={favorite.id}
                  recipe={{
                    id: favorite.recipeId,
                    name: favorite.name,
                    image: favorite.image,
                    cuisine: favorite.cuisine,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Favorites;
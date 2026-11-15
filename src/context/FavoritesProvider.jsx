import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { FavoritesContext } from "./FavoritesContext";

const API_URL = "http://localhost:3001";

function FavoritesProvider({ children }) {
  const { user } = useContext(AuthContext);
  const userId = user.id;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const actionLock = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFavorites() {
      try {
        const response = await fetch(
          `${API_URL}/favorites?userId=${encodeURIComponent(userId)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Nepavyko gauti mėgstamiausių receptų.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setFavorites(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof TypeError
              ? "Nepavyko susisiekti su vietiniu serveriu. Paleiskite jį ir perkraukite puslapį."
              : error.message
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadFavorites();

    return () => controller.abort();
  }, [userId]);

  async function toggleFavorite(recipe) {
    if (isLoading || loadError || actionLock.current) return;

    actionLock.current = true;
    setIsUpdating(true);
    setActionError("");

    try {
      const existingFavorite = favorites.find(
        (favorite) => favorite.recipeId === recipe.id
      );

      if (existingFavorite) {
        const response = await fetch(
          `${API_URL}/favorites/${encodeURIComponent(existingFavorite.id)}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error("Nepavyko pašalinti recepto iš mėgstamiausių.");
        }

        setFavorites((previousFavorites) =>
          previousFavorites.filter(
            (favorite) => favorite.id !== existingFavorite.id
          )
        );
      } else {
        const response = await fetch(`${API_URL}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            recipeId: recipe.id,
            name: recipe.name,
            image: recipe.image,
            cuisine: recipe.cuisine,
          }),
        });

        if (!response.ok) {
          throw new Error("Nepavyko pridėti recepto į mėgstamiausius.");
        }

        const newFavorite = await response.json();

        setFavorites((previousFavorites) => [
          ...previousFavorites,
          newFavorite,
        ]);
      }
    } catch (error) {
      setActionError(
        error instanceof TypeError
          ? "Nepavyko susisiekti su vietiniu serveriu. Pakeitimas nepatvirtintas."
          : error.message
      );
    } finally {
      actionLock.current = false;
      setIsUpdating(false);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        loadError,
        isUpdating,
        toggleFavorite,
      }}
    >
      {loadError && (
        <p className="error-message" role="alert">
          {loadError}
        </p>
      )}

      {actionError && (
        <p className="error-message" role="alert">
          {actionError}
        </p>
      )}

      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
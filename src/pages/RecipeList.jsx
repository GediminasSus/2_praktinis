import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const PAGE_SIZE = 5;

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipes() {
      setIsLoading(true);
      setError("");

      const skip = (page - 1) * PAGE_SIZE;

      try {
        const response = await fetch(
          `https://dummyjson.com/recipes?limit=${PAGE_SIZE}&skip=${skip}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Nepavyko gauti receptų.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setRecipes(data.recipes);
          setTotal(data.total);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof TypeError
              ? "Nepavyko susisiekti su receptų serveriu."
              : error.message
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchRecipes();

    return () => controller.abort();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section>
      <h1>Receptai</h1>

      {isLoading && <p role="status">Kraunami receptai...</p>}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <>
          {recipes.length === 0 ? (
            <p>Receptų nerasta.</p>
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}

      <div className="pagination">
        <button
          type="button"
          disabled={isLoading || page === 1}
          onClick={() => setPage((previousPage) => previousPage - 1)}
        >
          Atgal
        </button>

        <span>
          Puslapis {page} iš {totalPages}
        </span>

        <button
          type="button"
          disabled={isLoading || page >= totalPages}
          onClick={() => setPage((previousPage) => previousPage + 1)}
        >
          Kitas
        </button>
      </div>
    </section>
  );
}

export default RecipeList;
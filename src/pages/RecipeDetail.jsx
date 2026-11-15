import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipe() {
      setIsLoading(true);
      setError("");
      setNotFound(false);
      setRecipe(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/${encodeURIComponent(id)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          if (!controller.signal.aborted) {
            setNotFound(true);
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Nepavyko gauti recepto informacijos.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setRecipe(data);
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

    fetchRecipe();

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <p role="status">Kraunama recepto informacija...</p>;
  }

  if (error) {
    return (
      <section>
        <p className="error-message" role="alert">
          {error}
        </p>
        <Link to="/dashboard">Grįžti prie receptų</Link>
      </section>
    );
  }

  if (notFound || !recipe) {
    return (
      <section>
        <h1>Receptas nerastas</h1>
        <p>Recepto tokiu numeriu nėra.</p>
        <Link to="/dashboard">Grįžti prie receptų</Link>
      </section>
    );
  }

  return (
    <article className="recipe-detail">
      <Link to="/dashboard">Grįžti prie receptų</Link>

      <h1>{recipe.name}</h1>
      <p>Virtuvė: {recipe.cuisine}</p>

      <img
        className="recipe-detail-image"
        src={recipe.image}
        alt={recipe.name}
      />

      <dl className="recipe-meta">
        <div>
          <dt>Paruošimas</dt>
          <dd>{recipe.prepTimeMinutes} min.</dd>
        </div>

        <div>
          <dt>Gaminimas</dt>
          <dd>{recipe.cookTimeMinutes} min.</dd>
        </div>

        <div>
          <dt>Porcijų skaičius</dt>
          <dd>{recipe.servings}</dd>
        </div>
      </dl>

      <h2>Ingredientai</h2>

      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Gaminimo žingsniai</h2>

      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </article>
  );
}

export default RecipeDetail;
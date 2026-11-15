import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.name} loading="lazy" />

      <div className="recipe-card-content">
        <h2>{recipe.name}</h2>
        <p>Virtuvė: {recipe.cuisine}</p>

        <Link to={`/recipe/${recipe.id}`}>
          Peržiūrėti receptą
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
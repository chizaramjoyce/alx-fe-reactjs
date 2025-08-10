import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      {recipes.map(recipe => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;

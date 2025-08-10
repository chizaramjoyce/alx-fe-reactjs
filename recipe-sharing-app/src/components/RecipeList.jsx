import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <SearchBar />
      <div>
        {filteredRecipes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No recipes found.</p>
        ) : (
          filteredRecipes.map(recipe => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{recipe.title}</h3>
                <p style={{ margin: 0 }}>{recipe.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;

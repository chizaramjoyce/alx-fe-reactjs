import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

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
          filteredRecipes.map(recipe => {
            const isFavorite = favorites.includes(recipe.id);
            return (
              <div key={recipe.id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{recipe.title}</h3>
                    <p style={{ margin: 0 }}>{recipe.description}</p>
                  </Link>
                </div>
                <button
                  onClick={() => isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id)}
                  style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: isFavorite ? '#ffd700' : '#111', cursor: 'pointer' }}
                >
                  {isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecipeList;

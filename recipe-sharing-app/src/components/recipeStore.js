import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // Array of favorite recipe IDs
  favorites: [],

  // Array of recommended recipe objects
  recommendations: [],

  // Add a new recipe to the list
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),

  // Replace all recipes
  setRecipes: (recipes) => set({ recipes }),

  // Update the search term for filtering
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Filter recipes by search term; show all if empty
  filterRecipes: () => set(state => ({
    filteredRecipes:
      state.searchTerm.trim() === ''
        ? state.recipes
        : state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
  })),

  // Add a recipe ID to favorites
  addFavorite: (recipeId) => set(state => ({ favorites: [...state.favorites, recipeId] })),

  // Remove a recipe ID from favorites
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  // Generate recommendations based on favorites (mock: random selection from favorites)
  generateRecommendations: () => set(state => {
    // For demo: randomly recommend some favorite recipes
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),

  // Update a recipe by ID
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id.toString() === updatedRecipe.id.toString() ? updatedRecipe : recipe
    )
  })),

  // Delete a recipe by ID
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id.toString() !== recipeId.toString())
  })),
}));

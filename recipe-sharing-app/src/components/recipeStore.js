import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id.toString() !== recipeId.toString())
  })),
  getRecipeById: (id) => {
    const state = useRecipeStore.getState();
    return state.recipes.find(recipe => String(recipe.id) === String(id));
  },
}));

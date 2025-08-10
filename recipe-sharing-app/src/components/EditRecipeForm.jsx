import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(recipe => recipe.id.toString() === id);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const [form, setForm] = useState({
    title: recipe?.title || '',
    description: recipe?.description || '',
  });

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({
      id: recipe.id,
      ...form,
    });
    navigate(`/recipe/${id}`);
  };

  return (
    <form className="edit-recipe-form" onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <label>Title:
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label>Description:
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;

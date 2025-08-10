import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => state.getRecipeById(id));

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <p><strong>Description:</strong> {recipe.description}</p>
      <EditRecipeForm />
      <DeleteRecipeButton id={id} />
    </div>
  );
};

export default RecipeDetails;

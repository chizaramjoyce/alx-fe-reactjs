import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/data.json');
        const recipes = await response.json();
        const foundRecipe = recipes.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      {/* Hero Section with Image */}
      <div className="relative h-48 sm:h-64 md:h-96 mb-6 sm:mb-8 md:mb-12 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-75 flex items-end">
          <div className="p-4 sm:p-6 md:p-8 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {recipe.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200">
              {recipe.category}
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        {/* Left Column - Info & Ingredients */}
        <div className="md:col-span-1 space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Info</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Prep Time:</span>
                <span className="font-medium">{recipe.prepTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cook Time:</span>
                <span className="font-medium">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Servings:</span>
                <span className="font-medium">{recipe.servings}</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li 
                  key={index}
                  className="flex items-start text-sm sm:text-base"
                >
                  <span className="text-blue-600 mr-2">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Instructions & Description */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {recipe.description}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li 
                  key={index}
                  className="flex items-start text-sm sm:text-base"
                >
                  <span className="font-bold text-blue-600 mr-3">
                    {index + 1}.
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;

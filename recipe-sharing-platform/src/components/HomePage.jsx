import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/src/data.json");
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-0">Recipe Sharing Platform</h1>
        <Link
          to="/add-recipe"
          className="px-6 py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md shadow-sm hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Recipe
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <div className="p-3 sm:p-4 md:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 transition-colors duration-200 hover:text-blue-600">{recipe.title}</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 line-clamp-3 mb-6">{recipe.summary}</p>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  className="w-full sm:w-auto mt-3 sm:mt-4 md:mt-6 px-4 py-2 sm:py-2.5 md:py-3 bg-blue-600 text-white text-sm sm:text-base md:text-lg rounded transform transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;

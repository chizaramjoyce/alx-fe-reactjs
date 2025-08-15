import { useEffect, useState } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Recipe Sharing Platform</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 transition-colors duration-200 hover:text-blue-600">{recipe.title}</h2>
                <p className="text-gray-600">{recipe.summary}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded transform transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipeForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: '',
    ingredients: ['', ''], // Start with two empty ingredient fields
    instructions: [''] // Start with one empty instruction field
  });

  const validateForm = () => {
    const newErrors = {};
    
    // Check for empty fields
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
    if (!formData.servings.trim()) newErrors.servings = 'Number of servings is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    
    // Check ingredients (minimum 2 non-empty ingredients)
    const validIngredients = formData.ingredients.filter(ing => ing.trim());
    if (validIngredients.length < 2) {
      newErrors.ingredients = 'At least 2 ingredients are required';
    }

    // Check instructions (minimum 1 non-empty instruction)
    const validInstructions = formData.instructions.filter(inst => inst.trim());
    if (validInstructions.length < 1) {
      newErrors.instructions = 'At least 1 instruction is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800">
        Add New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.servings ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.servings && <p className="mt-1 text-sm text-red-500">{errors.servings}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleInputChange}
                placeholder="e.g., 30 mins"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.prepTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.prepTime && <p className="mt-1 text-sm text-red-500">{errors.prepTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time</label>
              <input
                type="text"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleInputChange}
                placeholder="e.g., 1 hour"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.cookTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cookTime && <p className="mt-1 text-sm text-red-500">{errors.cookTime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.summary ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Ingredients</h2>
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Ingredient
            </button>
          </div>
          
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayInputChange(index, 'ingredients', e.target.value)}
                placeholder="e.g., 2 cups flour"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.ingredients.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('ingredients', index)}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
        </div>

        {/* Instructions Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Preparation steps</h2>
            <button
              type="button"
              onClick={() => addArrayItem('instructions')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Step
            </button>
          </div>
          
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-none pt-3 text-gray-500">
                {index + 1}.
              </div>
              <textarea
                value={instruction}
                onChange={(e) => handleArrayInputChange(index, 'instructions', e.target.value)}
                placeholder="Describe this step..."
                rows="2"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('instructions', index)}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors.instructions && <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 text-sm sm:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;

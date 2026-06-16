'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // CRITICAL: import Link

export default function NewRecipePage() {
  const router = useRouter();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [originalServings, setOriginalServings] = useState(4);
  const [desiredServings, setDesiredServings] = useState(4);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [message, setMessage] = useState('');

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const validateInputs = () => {
    if (!recipeTitle.trim()) {
      setMessage('Recipe title cannot be empty.');
      return false;
    }
    if (originalServings <= 0 || desiredServings <= 0) {
      setMessage('Servings must be positive numbers.');
      return false;
    }
    for (const ing of ingredients) {
      if (!ing.name.trim() && (ing.quantity !== '' || ing.unit !== '')) { // Allow empty ingredient lines if quantity/unit are also empty
        setMessage('Ingredient name cannot be empty if quantity or unit are provided.');
        return false;
      }
      if (ing.name.trim() && (ing.quantity === '' || isNaN(parseFloat(ing.quantity)))) {
        setMessage(`Quantity for ${ing.name || 'an ingredient'} must be a valid number.`);
        return false;
      }
    }
    setMessage('');
    return true;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const recipeData = {
      title: recipeTitle,
      originalServings: parseFloat(originalServings),
      desiredServings: parseFloat(desiredServings),
      ingredients: ingredients.filter(ing => ing.name.trim() && parseFloat(ing.quantity) > 0).map(ing => ({
        ...ing,
        quantity: parseFloat(ing.quantity),
      })),
    };

    localStorage.setItem('currentRecipe', JSON.stringify(recipeData));
    router.push('/scaled-recipe-view');
  };

  const handleSaveRecipe = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const recipeToSave = {
      id: Date.now(), // Unique ID for the recipe
      title: recipeTitle,
      originalServings: parseFloat(originalServings),
      ingredients: ingredients.filter(ing => ing.name.trim() && parseFloat(ing.quantity) > 0).map(ing => ({
        ...ing,
        quantity: parseFloat(ing.quantity),
      })),
    };

    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    localStorage.setItem('savedRecipes', JSON.stringify([...savedRecipes, recipeToSave]));
    setMessage('Recipe saved successfully!');
    // Optionally, clear form or redirect
    setRecipeTitle('');
    setOriginalServings(4);
    setDesiredServings(4);
    setIngredients([{ name: '', quantity: '', unit: '' }]);
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };


  return (
    <div className="container" style={{ maxWidth: '900px', width: '100%' }}>
      <h1 className="text-center mb-lg">Create a New Recipe</h1>

      <form className="glass-card flex-col gap-md" onSubmit={handleCalculate}>
        {message && <p style={{ color: 'var(--accent-purple)', textAlign: 'center' }}>{message}</p>}

        <div className="form-group">
          <label htmlFor="recipeTitle">Recipe Title</label>
          <input
            id="recipeTitle"
            type="text"
            className="input-field"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            placeholder="e.g., Grandma's Chocolate Chip Cookies"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="originalServings">Original Servings</label>
          <input
            id="originalServings"
            type="number"
            className="input-field"
            value={originalServings}
            onChange={(e) => setOriginalServings(e.target.value)}
            min="1"
            required
          />
        </div>

        <h3 className="mb-md">Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="input-grid glass-card-inner">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor={`ingredientName-${index}`}>Name</label>
              <input
                id={`ingredientName-${index}`}
                type="text"
                className="input-field"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="e.g., All-purpose flour"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor={`ingredientQuantity-${index}`}>Quantity</label>
              <input
                id={`ingredientQuantity-${index}`}
                type="number"
                step="0.01"
                className="input-field"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                placeholder="e.g., 2.5"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor={`ingredientUnit-${index}`}>Unit</label>
              <input
                id={`ingredientUnit-${index}`}
                type="text"
                className="input-field"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                placeholder="e.g., cups"
              />
            </div>
            {ingredients.length > 1 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeIngredient(index)}
                style={{ alignSelf: 'flex-end', height: 'fit-content' }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-md" onClick={addIngredient}>
          Add Ingredient
        </button>

        <div className="form-group mt-lg">
          <label htmlFor="desiredServings">Desired Servings</label>
          <input
            id="desiredServings"
            type="number"
            className="input-field"
            value={desiredServings}
            onChange={(e) => setDesiredServings(e.target.value)}
            min="1"
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
          <button type="submit" className="btn">
            Calculate Scaled Recipe
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleSaveRecipe}>
            Save Recipe
          </button>
        </div>
      </form>

      <div className="text-center mt-lg">
        <Link href="/saved-recipes" className="navbar-link">
          View all saved recipes
        </Link>
      </div>
    </div>
  );
}

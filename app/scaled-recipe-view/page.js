'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // CRITICAL: import Link

export default function ScaledRecipeViewPage() {
  const router = useRouter();
  const [originalRecipe, setOriginalRecipe] = useState(null);
  const [scaledIngredients, setScaledIngredients] = useState([]);
  const [desiredServings, setDesiredServings] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recipeData = localStorage.getItem('currentRecipe');
      if (recipeData) {
        const parsedRecipe = JSON.parse(recipeData);
        setOriginalRecipe(parsedRecipe);
        setDesiredServings(parsedRecipe.desiredServings.toString());
        scaleIngredients(parsedRecipe, parsedRecipe.desiredServings);
      } else {
        setMessage('No recipe data found. Please create a new recipe first.');
        // Redirect if no recipe data
        setTimeout(() => router.push('/new-recipe'), 3000);
      }
    }
  }, [router]);

  const scaleIngredients = (recipe, newServings) => {
    if (!recipe || !recipe.ingredients || newServings <= 0) {
      setScaledIngredients([]);
      return;
    }

    const scaleFactor = newServings / recipe.originalServings;
    const newScaledIngredients = recipe.ingredients.map(ing => ({
      ...ing,
      scaledQuantity: (ing.quantity * scaleFactor).toFixed(2), // Round to 2 decimal places
    }));
    setScaledIngredients(newScaledIngredients);
  };

  const handleDesiredServingsChange = (e) => {
    const newServings = parseFloat(e.target.value);
    setDesiredServings(e.target.value);
    if (originalRecipe && newServings > 0) {
      scaleIngredients(originalRecipe, newServings);
    }
  };

  const handleSaveRecipe = () => {
    if (!originalRecipe) {
      setMessage('No recipe to save.');
      return;
    }

    const recipeToSave = {
      id: Date.now(), // Unique ID for the recipe
      title: originalRecipe.title,
      originalServings: originalRecipe.originalServings,
      ingredients: originalRecipe.ingredients, // Save original ingredients
      // Optional: could save desiredServings if we want to save the scaled view specifically
    };

    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    // Check if a recipe with the same title and original servings already exists to prevent duplicates on re-save
    const isDuplicate = savedRecipes.some(
      (r) => r.title === recipeToSave.title && r.originalServings === recipeToSave.originalServings
    );

    if (isDuplicate) {
      setMessage('This recipe (or a very similar one) is already saved!');
    } else {
      localStorage.setItem('savedRecipes', JSON.stringify([...savedRecipes, recipeToSave]));
      setMessage('Recipe saved successfully!');
    }
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  if (message && !originalRecipe) {
    return (
      <div className="container text-center">
        <h1 style={{ color: 'var(--accent-purple)' }}>{message}</h1>
        <p>Redirecting to New Recipe page...</p>
      </div>
    );
  }

  if (!originalRecipe) {
    return (
      <div className="container text-center">
        <h1 style={{ color: 'var(--accent-cyan)' }}>Loading Recipe...</h1>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '900px', width: '100%' }}>
      <h1 className="text-center mb-lg">{originalRecipe.title}</h1>
      {message && <p style={{ color: 'var(--accent-purple)', textAlign: 'center' }}>{message}</p>}

      <div className="glass-card flex-col gap-md">
        <div className="form-group">
          <label htmlFor="desiredServings" style={{ fontSize: '1.2rem' }}>Adjust Desired Servings</label>
          <input
            id="desiredServings"
            type="number"
            className="input-field"
            value={desiredServings}
            onChange={handleDesiredServingsChange}
            min="1"
            placeholder="Enter new desired servings"
            required
            style={{ fontSize: '1.1rem', padding: '0.6rem 1rem' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Original Recipe Section */}
          <div>
            <h2 className="mb-md">Original Recipe ({originalRecipe.originalServings} Servings)</h2>
            <ul className="glass-card-inner" style={{ listStyle: 'none', padding: 0 }}>
              {originalRecipe.ingredients.map((ing, index) => (
                <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{ing.name}</span>
                  <span>{ing.quantity} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scaled Recipe Section */}
          <div>
            <h2 className="mb-md">Scaled Recipe ({parseFloat(desiredServings) || 0} Servings)</h2>
            <ul className="glass-card-inner" style={{ listStyle: 'none', padding: 0 }}>
              {scaledIngredients.map((ing, index) => (
                <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{ing.name}</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{ing.scaledQuantity} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
          <button type="button" className="btn" onClick={handleSaveRecipe}>
            Save This Recipe
          </button>
          <Link href="/new-recipe" className="btn btn-secondary">
            Create Another Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

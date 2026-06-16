'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // CRITICAL: import Link

export default function SavedRecipesPage() {
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadSavedRecipes();
    }
  }, []);

  const loadSavedRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    setSavedRecipes(recipes);
  };

  const handleViewRecipe = (recipe) => {
    // When viewing a saved recipe, set it as the 'currentRecipe'
    // This allows scaled-recipe-view to load it and potentially scale it
    // Set desiredServings to originalServings initially for a consistent view
    localStorage.setItem('currentRecipe', JSON.stringify({
      ...recipe,
      desiredServings: recipe.originalServings, // Default to original servings when loading from saved
    }));
    router.push('/scaled-recipe-view');
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    setSavedRecipes(updatedRecipes);
    setMessage('Recipe deleted successfully!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="container" style={{ maxWidth: '900px', width: '100%' }}>
      <h1 className="text-center mb-lg">Your Saved Recipes</h1>
      {message && <p style={{ color: 'var(--accent-purple)', textAlign: 'center' }}>{message}</p>}

      {savedRecipes.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '3rem' }}>
          <h2 style={{ color: 'var(--accent-blue)' }}>No recipes saved yet!</h2>
          <p className="mb-md">Start by creating a new recipe and saving it.</p>
          <Link href="/new-recipe" className="btn">
            Create New Recipe
          </Link>
        </div>
      ) : (
        <div className="flex-col gap-md">
          {savedRecipes.map((recipe) => (
            <div key={recipe.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <h2>{recipe.title}</h2>
                <p>Original Servings: {recipe.originalServings}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn" onClick={() => handleViewRecipe(recipe)}>
                  View / Scale
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteRecipe(recipe.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-lg">
        <Link href="/new-recipe" className="navbar-link">
          Go back to create a new recipe
        </Link>
      </div>
    </div>
  );
}

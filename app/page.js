import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container flex-col gap-lg text-center" style={{ maxWidth: '800px' }}>
      <h1>Welcome to Recipe Scaling Calculator!</h1>
      <p>
        Easily adjust your favorite recipes to any serving size. No more tedious manual calculations or wasted ingredients!
      </p>

      <div className="glass-card" style={{ width: '100%', maxWidth: '600px' }}>
        <h2>Get Started</h2>
        <p className="mb-md">Choose an option below to begin scaling your recipes.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/new-recipe" className="btn">
            Create a New Recipe
          </Link>
          <Link href="/saved-recipes" className="btn btn-secondary">
            View Saved Recipes
          </Link>
        </div>
      </div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '600px' }}>
        <h2>How It Works</h2>
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-cyan)', marginRight: '0.5rem' }}>&#x2022;</span>
            Enter your recipe's ingredients, original quantities, and serving size.
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-cyan)', marginRight: '0.5rem' }}>&#x2022;</span>
            Specify the new desired serving count.
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-cyan)', marginRight: '0.5rem' }}>&#x2022;</span>
            Instantly get all ingredient amounts recalculated.
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-cyan)', marginRight: '0.5rem' }}>&#x2022;</span>
            Save your recipes locally for future use!
          </li>
        </ul>
      </div>
    </div>
  );
}

import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Recipe Scaling Calculator',
  description: 'Easily scale your recipes to any serving size.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="navbar-logo">
            RecipeScaler
          </Link>
          <div className="navbar-links">
            <Link href="/" className="navbar-link">
              Home
            </Link>
            <Link href="/new-recipe" className="navbar-link">
              New Recipe
            </Link>
            <Link href="/saved-recipes" className="navbar-link">
              Saved Recipes
            </Link>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}

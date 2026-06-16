# Recipe Scaling Calculator

This Next.js 14 App Router application helps home cooks easily scale recipes to their desired serving sizes. Users can input recipe ingredients, original quantities, and serving size, and the app will automatically recalculate all ingredient amounts for a new desired serving count. Recipes can also be saved and loaded locally for future use.

## Features

*   **Dynamic Scaling:** Adjust ingredient quantities based on desired servings.
*   **Recipe Management:** Add new recipes with multiple ingredients.
*   **Local Storage:** Save and load custom recipes directly in your browser.
*   **Stunning UI:** Dark theme with vibrant gradients and glassmorphic elements.

## Pages

*   **Home:** Welcome page with navigation to create a new recipe or view saved ones.
*   **New Recipe:** Form to input a recipe's title, original servings, and a list of ingredients with their quantities and units.
*   **Scaled Recipe View:** Displays the recipe with original and scaled ingredient amounts. Allows re-scaling.
*   **Saved Recipes:** Lists all recipes saved locally, with options to view or delete them.

## Setup and Run

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd recipe-scaling-calculator
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

4.  **Build for production:**
    ```bash
    npm run build
    ```
5.  **Start the production server:**
    ```bash
    npm run start
    ```

## Technologies Used

*   Next.js 14 (App Router)
*   React 18
*   Client-side state management with `useState` and `useEffect`
*   Local Storage for persistence
*   Pure CSS for styling (no Tailwind, no CSS modules)

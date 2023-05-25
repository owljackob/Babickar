import { RecipeImageContainer, RecipeItemContainer } from "./styles";
import axios from "axios";
import { useState } from "react";
import "./recipe-item.css";



export function RecipeItem({ recipe }) {
  const [error, setError] = useState("");
  const recipeId = recipe.id;

  async function deleteRecipe(recipeId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recipesApi/allRecipes/${recipeId}/delete`
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting recipe: ", error);
      setError("Error deleting recipe: ", error);
    }
  }

  return (
    <RecipeItemContainer to={`/recipe/${recipeId}`}>
      <RecipeImageContainer>
        <img src={recipe.image} alt="Obrázek receptu" />
      </RecipeImageContainer>
      <div className="recipe-info">
        <p>{recipe.name}</p>
      </div>
      <div className="button-container">
        <button className="delete-button" onClick={() => deleteRecipe(recipe.id)}>Smazat</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </RecipeItemContainer >
  );
}

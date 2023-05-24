import { RecipeImageContainer, RecipeItemContainer } from "./styles";

export function RecipeItem({ recipe }) {
  return (
    <RecipeItemContainer to={`/allRecipes/${recipe.id}`} target="_blank">
      <RecipeImageContainer>
        <img src={recipe.image} alt={recipe.title} />
      </RecipeImageContainer>
      <p>{recipe.title}</p>
    </RecipeItemContainer>
  );
}

import { RecipeItem } from "../RecipeItem";
import { RecipesListContainer } from "./styles";

export function RecipesList({ recipes }) {
  return (
    <RecipesListContainer to={`/allRecipes`} target="_blank">
      {recipes.map((item) => {
        return <RecipeItem key={item.id} recipe={item} />;
      })}
    </RecipesListContainer>
  );
}

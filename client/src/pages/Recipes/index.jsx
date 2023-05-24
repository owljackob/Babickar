import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { PageHeader } from "../../components/PageHeader";
import { Pagination } from "../../components/Pagination";
import { RecipesList } from "../../components/RecipesList";
import { RecipesContainer, SearchInput } from "./styles";
import AddRecipePopup from './AddRecipePopup';

const ITEMS_PER_PAGE = 12;

export function Recipes() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/recipesApi/allRecipes");
      setRecipes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error getting recipes: ", error);
    }
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const addRecipe = (recipeName) => {
    const newRecipe = { name: recipeName };
    setRecipes([...recipes, newRecipe]);
    closePopup();
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    let filteredRecipes = recipes;
    if (debouncedSearch.trim()) {
      const lowercasedSearch = debouncedSearch.toLowerCase();
      filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(lowercasedSearch)
      );
    }

    // Handle pagination here
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRecipes = filteredRecipes.slice(start, start + ITEMS_PER_PAGE);
    setDisplayedRecipes(paginatedRecipes);
  }, [recipes, debouncedSearch, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);  // reset page number when search changes
  };

  return (
    <RecipesContainer>
      <PageHeader title="Recepty" subtitle="Recepty pro celou rodinu" />
      <SearchInput
        onChange={onChangeSearch}
        value={search}
        placeholder="Co chceš dnes vařit?"
        type="search"
      />
      <button onClick={openPopup}>Sdílení receptu</button>
      <AddRecipePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddRecipe={addRecipe}
      />
      <RecipesList recipes={displayedRecipes} />
      {recipes.length > 0 && (
        <Pagination
          totalCountOfRegisters={recipes.length}
          currentPage={currentPage}
          onPageChange={onPageChange}
          registerPerPage={ITEMS_PER_PAGE}
        />
      )}
    </RecipesContainer>
  );
}

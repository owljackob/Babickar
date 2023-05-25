import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { PageHeader } from "../../components/PageHeader";
import { Pagination } from "../../components/Pagination";
import { RecipesList } from "../../components/RecipesList";
import { RecipesContainer, SearchInput } from "./styles";
import AddRecipePopup from "./AddRecipePopup";
import "./share-button.css";

const ITEMS_PER_PAGE = 12;

export function Recipes() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/recipesApi/allRecipes"
      );
      const sortedRecipes = response.data.sort((a, b) => b.id - a.id);
      setRecipes(sortedRecipes);
    } catch (error) {
      console.error("Error getting recipes: ", error);
    }
  }, []);

  const filteredRecipes = useMemo(() => {
    let results = recipes;
    if (debouncedSearch.trim()) {
      const lowercasedSearch = debouncedSearch.toLowerCase();
      results = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(lowercasedSearch)
      );
    }
    return results;
  }, [recipes, debouncedSearch]);

  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecipes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecipes, currentPage]);

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

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // reset page number when search changes
  };

  return (
    <RecipesContainer>
      <PageHeader title="Recepty" subtitle="Recepty pro celou rodinu" />
      <div className="search-container">
        <SearchInput
          onChange={onChangeSearch}
          value={search}
          placeholder="Co chceš dnes vařit?"
          type="search"
        />
        <button onClick={openPopup}>Sdílet recept</button>
      </div>
      <AddRecipePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddRecipe={addRecipe}
      />
      <RecipesList recipes={paginatedRecipes} />
      {recipes.length > 0 ? (
        <Pagination
          totalCountOfRegisters={filteredRecipes.length}
          currentPage={currentPage}
          onPageChange={onPageChange}
          registerPerPage={ITEMS_PER_PAGE}
        />
      ) : (
        <p>Čas přidat nějaké recepty</p>
      )}
    </RecipesContainer>
  );
}

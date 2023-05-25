import { Routes, Route } from "react-router-dom";
import { Recipes } from "./pages/Recipes";
import { Recipe } from "./pages/Recipe";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Recipes />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

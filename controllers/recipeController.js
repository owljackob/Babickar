const express = require('express');
const recipeService = require('../services/recipeService');

const router = express.Router();

router.post('/recipes', async (req, res) => {
  try {
    const { name, categoryId, difficultyId, materials } = req.body;
    const recipe = await recipeService.createRecipe(
        name,
        categoryId,
        difficultyId,
        materials
    );
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating the recipe:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/recipes/:id', async (req, res) => {
  try {
    const recipeWithMaterials = await recipeService.getRecipeById(req.params.id);
    res.json(recipeWithMaterials);
  } catch (error) {
    console.error('Error getting the recipe:', error);
    res.status(404).json({ error: error.message });
  }
});

router.get('/allRecipes', async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error getting the recipe:', error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
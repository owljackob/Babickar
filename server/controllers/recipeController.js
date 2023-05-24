const express = require('express');
const recipeService = require('../services/recipeService');

const router = express.Router();

router.post('/allRecipes/create', async (req, res) => {
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

router.get('/allRecipes/:id', async (req, res) => {
  try {
    const recipeWithMaterials = await recipeService.getRecipeById(req.params.id);
    res.json(recipeWithMaterials);
  } catch (error) {
    console.error('Error getting the recipe:', error);
    res.status(404).json({ error: error.message });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { categoryId, difficultyId } = req.query;
    const recipesByFilter = await recipeService.getRecipesByFilter(
        Number(categoryId),
        Number(difficultyId)
    );

    return res.json(recipesByFilter);
  } catch (error) {
    console.error('Error filtering the recipes:', error);
    res.status(404).json({ error: error.message });
  }
})
router.get('/allRecipes', async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      const recipes = await recipeService.getAllRecipes();
      res.json(recipes);
    } else {
      const recipes = await recipeService.getRecipesBySearch(search);
      res.json(recipes);
    }
  } catch (error) {
    console.error('Error getting the recipe:', error);
    res.status(404).json({ error: error.message });
  }
});

router.delete('/allRecipes/:id/delete', async (req, res) => {
  try {
    await recipeService.deleteRecipeById(req.params.id);
    res.status(201).json({message: 'Recipe deleted successfully'});
  } catch (error) {
    console.error('Error deleting the recipe:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/allRecipes/:id/update', async (req, res) => {
  const recipeId = req.params.id;
  const { name, categoryId, difficultyId, materials} = req.body;

  try {
    await recipeService.updateRecipe(recipeId, name, categoryId, difficultyId, materials);
    res.status(201).send('Recipe updated successfully');
  } catch (error) {
    console.error('Error updating the recipe:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
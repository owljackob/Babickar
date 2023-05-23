const express = require('express');
const RecipeController = require('../controllers/recipeController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/api/recipesApi', RecipeController);

module.exports = router;
const express = require('express');
const IngredientController = require('../controllers/ingredientController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/ingredientsApi', IngredientController);

module.exports = router;
const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/api/categoriesApi', CategoryController);

module.exports = router;
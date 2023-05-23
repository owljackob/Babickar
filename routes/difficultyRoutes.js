const express = require('express');
const DifficultyController = require('../controllers/difficultyController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/api/difficultiesApi', DifficultyController);

module.exports = router;
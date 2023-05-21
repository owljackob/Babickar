const express = require('express');
const categoryService = require("../services/categoryService");

const router = express.Router();

router.get('/categories', async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/categories/:id', async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    } catch (error) {
        console.error('Error getting category by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
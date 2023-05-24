const express = require('express');
const difficultyService = require("../services/difficultyService");

const router = express.Router();

router.get('/allDifficulties', async (req, res) => {
    try {
        const difficulties = await difficultyService.getAllCategories();
        res.json(difficulties);
    } catch (error) {
        console.error('Error getting difficulties:', error);
        res.status(404).json({ error: error.message });
    }
});
// router.get('/difficulties/:id', async (req, res) => {
//     try {
//         const difficulty = await difficultyService.getDifficultyById(req.params.id);
//         res.json(difficulty);
//     } catch (error) {
//         console.error('Error getting difficulty by ID:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = router;
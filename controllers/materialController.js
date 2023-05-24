const express = require('express');
const materialService = require("../services/materialService");

const router = express.Router();

router.get('/allMaterials', async (req, res) => {
    try {
        const materials = await materialService.getAllMaterials();
        res.json(materials);
    } catch (error) {
        console.error('Error getting difficulties:', error);
        res.status(404).json({ error: error.message });
    }
});
// router.get('/allIngredients/:id', async (req, res) => {
//     try {
//         const ingredient = await ingredientService.getIngredientById(req.params.id);
//         res.json(ingredient);
//     } catch (error) {
//         console.error('Error getting difficulty by ID:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = router;
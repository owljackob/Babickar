const Material = require('../models/material');
const Ingredient = require("../models/ingredient");

class MaterialService {

    async createMaterial(count, unit, recipeId, ingredientId) {
        try {
            const material = await Material.create({
                count,
                unit,
                recipeId,
                ingredientId
            });
            return material;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create recipe. ' + error);
        }

    }

}
module.exports = new MaterialService();
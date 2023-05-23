const Ingredient = require('../models/ingredient');

class IngredientService {

    async getAllIngredients() {
        try {
            return await Ingredient.findAll();
        } catch (error) {
            console.error('Error retrieving difficulties: ', error);
            throw new Error('Error retrieving difficulties' + error);
        }
    }
    async getIngredientById(id) {
        try{
            return await Ingredient.findByPk(id);
        } catch ( error ) {
            console.error(error);
            throw new Error('Ingredient not found. ' + error);
         }
     }
}
module.exports = new IngredientService();
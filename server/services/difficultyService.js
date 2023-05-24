const Difficulty = require('../models/difficulty');

class DifficultyService {

    async getAllCategories() {
        try {
            return await Difficulty.findAll();
        } catch (error) {
            console.error('Error retrieving difficulties: ', error);
            throw new Error('Error retrieving difficulties' + error);
        }
    }
    // async getDifficultyById(id) {
    //     const difficulty = await Difficulty.findByPk(id);
    //     if (!difficulty) {
    //         throw new Error('Difficulty not found');
    //     }
    //     return difficulty;
    // }
}
module.exports = new DifficultyService();
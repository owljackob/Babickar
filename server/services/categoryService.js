const Category = require('../models/category');

class CategoryService {

    async getAllCategories() {
        try {
            return await Category.findAll();
        } catch (error) {
            console.error('Error retrieving categories:', error);
            throw new Error('Error retrieving categories');
        }
    }
    // async getCategoryById(id) {
    //     try {
    //         return await Category.findByPk(id);
    //     } catch (error) {
    //         console.error('Error retrieving categories:', error);
    //         throw new Error('Category not found.' + error);
    //     }
    // }
}
module.exports = new CategoryService();
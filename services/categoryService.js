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
    async getCategoryById(id) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }
}
module.exports = new CategoryService();
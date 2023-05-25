const Recipe = require('../models/recipe');
const Material = require("../models/material");
const Ingredient = require("../models/ingredient");
const Difficulty = require("../models/difficulty");
const Category = require("../models/category");
const materialService = require('./materialService');
const ingredientService = require('./ingredientService');
const { Sequelize } = require("sequelize");

class RecipeService {
    async createRecipe(name, categoryId, difficultyId, imgPath, instruction, materials) {
        try {
            const recipe = await Recipe.create({
                name,
                categoryId,
                difficultyId,
                imgPath,
                instruction
            });

            for (const materialData of materials){
                const {ingredientId, count, unit} = materialData;
                const ingredient = await ingredientService.getIngredientById(ingredientId);
                await materialService.createMaterial(
                    count,
                    unit,
                    recipe.id,
                    ingredient.id
                );
            }
            return recipe;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create recipe. ' + error);
        }
    }

    async getAllRecipes(){
        try {
            return await Recipe.findAll({
                include: [
                    {
                        model: Material,
                        include: {model: Ingredient}
                    },
                    {model: Difficulty},
                    {model: Category}
                ]
            });
        } catch (error) {
            console.error('Error retrieving recipes:', error);
            throw new Error('Error retrieving recipes');
        }
    }

    async getRecipesByFilter(categoryId, difficultyId) {
        try {
            let filter = {};
            if (categoryId !== null && !isNaN(categoryId)) {
                filter.categoryId = categoryId;
            }

            if (difficultyId !== null && !isNaN(difficultyId)) {
                filter.difficultyId = difficultyId;
            }

            return await Recipe.findAll({
                where: filter,
                include: [
                    {
                        model: Material,
                        include: { model: Ingredient }
                    },
                    { model: Difficulty },
                    { model: Category }
                ]
            });
        } catch (error) {
            console.error('Error filtering recipes:', error);
            throw new Error('Error filtering recipes');
        }
    }
    async getRecipesBySearch(input){
        try {
            return await Recipe.findAll({
                where: {
                    name: Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('name')
                        ), 'LIKE', '%' + input.toLowerCase() + '%')
                },
                include: [
                    {
                        model: Material,
                        include: {
                            model: Ingredient
                        }
                    },
                    {
                        model: Difficulty
                    },
                    {
                        model: Category
                    }
                ]
            });
        } catch (error) {
            console.error('Error retrieving recipes:', error);
            throw new Error('Error retrieving recipes');
        }
    }

    async getRecipeById(id) {
        try {
            const recipe = await Recipe.findByPk(id, {
                include: [
                    {
                        model: Material,
                        include: {model: Ingredient}
                    },
                    {model: Difficulty},
                    {model: Category}
                ]
            });
            return recipe;
        } catch (error) {
            console.error(error);
            throw new Error('Recipe is not found. ' + error);
        }
    }

    async deleteRecipeById(id){
        try {
            const recipe = await Recipe.findByPk(id);
            await recipe.destroy();
            return true;
        } catch (error) {
            console.error(error);
            throw new Error('Deletion error. Recipe is not found. ' + error);
        }
    }

    async updateRecipe(id, name, categoryId, difficultyId, materials){
        try {
            const recipe = await Recipe.findByPk(id, {
                include: [Material]
            });
            if (!recipe) {
                throw new Error('Recipe not found');
            }
            console.log(recipe);
            recipe.name = name;
            recipe.categoryId = categoryId;
            recipe.difficultyId = difficultyId;
            for (const material of recipe.Materials){
                await material.destroy();
            }

            for (const materialData of materials){
                const {ingredientId, count, unit} = materialData;
                const ingredient = await ingredientService.getIngredientById(ingredientId);
                console.log(ingredient);
                await materialService.createMaterial(
                    count,
                    unit,
                    recipe.id,
                    ingredient.id
                );
            }
            await recipe.save();
        } catch ( error ) {
            console.error(error);
            throw new Error('Failed to update recipe. Not found' + error);
        }
    }
}
module.exports = new RecipeService();
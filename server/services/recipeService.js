const Recipe = require('../models/recipe');
const materialService = require('./materialService');
const ingredientService = require('./ingredientService');
const Material = require("../models/material");
const Ingredient = require("../models/ingredient");
const Difficulty = require("../models/difficulty");
const Category = require("../models/category");
const {Op, Sequelize} = require("sequelize");

class RecipeService {
    async createRecipe(name, categoryId, difficultyId, materials) {
        try {
            const recipe = await Recipe.create({
                name,
                categoryId,
                difficultyId
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

    async getRecipesByFilter(categoryId, difficultyId){
        if (categoryId !== null && difficultyId !== null){
            try {
                return await Recipe.findAll({
                    where: {
                        categoryId: categoryId,
                        difficultyId: difficultyId
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
                })
            } catch (error) {
                console.error('Error filtering recipes:', error);
                throw new Error('Error filtering recipes');
            }
        } else if (categoryId !== null && difficultyId === null){
            try {
                return await Recipe.findAll({
                    where: {
                        categoryId: categoryId
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
                })
            } catch (error) {
                console.error('Error filtering recipes:', error);
                throw new Error('Error filtering recipes');
            }
        } else if (categoryId === null && difficultyId !== null){
            try {
                return await Recipe.findAll({
                    where: {
                        difficultyId: difficultyId
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
                })
            } catch (error) {
                console.error('Error filtering recipes:', error);
                throw new Error('Error filtering recipes');
            }
        } else {
            try {
                return this.getAllRecipes();
            } catch (error) {
                console.error('Error filtering recipes:', error);
                throw new Error('Error filtering recipes');
            }
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
            return recipe;
        } catch (error) {
            console.error(error);
            throw new Error('Recipe is not found. ' + error);
        }
    }
}
module.exports = new RecipeService();
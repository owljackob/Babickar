const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Category = require("./category");
const Difficulty = require("./difficulty");
const Material = require("./material");

class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            },
        },
        difficultyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Difficulty,
                key: 'id',
            }
        }
    },
    {
        sequelize,
        modelName: 'Recipe',
    }
);

Recipe.belongsTo(Category, { foreignKey: 'categoryId' });
Recipe.belongsTo(Difficulty, { foreignKey: 'difficultyId' });
Recipe.hasMany(Material, { foreignKey: 'recipeId', onDelete: 'CASCADE' });

module.exports = Recipe;

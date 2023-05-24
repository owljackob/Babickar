const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Ingredient = require("./ingredient");

class Material extends Model {}

Material.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        count: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Material',
        timestamps: false,
    }
);

Material.belongsTo(Ingredient, { foreignKey: 'ingredientId' });

module.exports = Material;

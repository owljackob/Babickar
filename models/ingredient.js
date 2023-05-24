const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Ingredient extends Model {}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Ingredient',
        timestamps: false,
    }
);


module.exports = Ingredient;

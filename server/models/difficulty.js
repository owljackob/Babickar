const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Difficulty extends Model {}

Difficulty.init(
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
    },
    {
        sequelize,
        modelName: 'Difficulty',
        timestamps: false,
    }
);

module.exports = Difficulty;

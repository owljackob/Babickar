const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Category = require("./category");

class Receipt extends Model {}

Receipt.init(
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
    },
    {
        sequelize,
        modelName: 'Receipt',
    }
);

Receipt.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Receipt;

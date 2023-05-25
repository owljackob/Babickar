const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cookbook', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    sync: {
        alter: true,
    },
});

module.exports = sequelize;
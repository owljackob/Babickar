const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cookbook', 'root', 'G01v62l67i90l92_', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
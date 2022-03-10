const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('petroleum-db', null, null, {
    dialect: 'sqlite',
    host: './dev.sqlite',
});

module.exports = sequelize;

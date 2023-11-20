const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'polls.sqlite'
});

module.exports = sequelize;

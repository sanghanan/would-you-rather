const { Sequelize } = require('sequelize');

// Setup a new database using SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'polls.sqlite' // Specify the file path for SQLite
});

module.exports = sequelize;

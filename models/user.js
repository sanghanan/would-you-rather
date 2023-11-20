const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class User extends Model {}

User.init({
    // Define fields
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hasVoted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize, // Pass the connection instance
    modelName: 'User' // Give a name to the model
});

module.exports = User;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Poll extends Model {}

Poll.init({
    // Define fields
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option1Text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option1Votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    option2Text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option2Votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize, // Pass the connection instance
    modelName: 'Poll' // Give a name to the model
});

module.exports = Poll;

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust the path to your database configuration file

const Envelope = sequelize.define('Envelope', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

module.exports = Envelope;


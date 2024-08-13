const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Envelope = sequelize.define('Envelope', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Envelope;

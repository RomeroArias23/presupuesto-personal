const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Envelope = require('./envelope');

const Transaction = sequelize.define('Transaction', {
  envelope_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Envelope,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {});

Envelope.hasMany(Transaction, { foreignKey: 'envelope_id' });
Transaction.belongsTo(Envelope, { foreignKey: 'envelope_id' });

module.exports = Transaction;

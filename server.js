require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const envelopeRoutes = require('./api/routes/envelopeRoutes');
const Transaction = require('./models/transactions');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use('/api', envelopeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Personal Budget API!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});


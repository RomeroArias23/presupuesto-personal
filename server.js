require('dotenv').config();
const express = require('express');
const envelopeRoutes = require('./api/routes/envelopeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', envelopeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Personal Budget API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


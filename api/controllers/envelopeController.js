const { envelopes } = require('../models/envelope');
let { nextId, totalBudget } = require('../models/envelope');

// Create an envelope
const createEnvelope = (req, res) => {
  const { title, budget } = req.body;

  if (!title || !budget || typeof budget !== 'number' || budget < 0) {
    return res.status(400).json({ error: 'Invalid title or budget' });
  }

  const envelope = { id: nextId++, title, budget };
  envelopes.push(envelope);
  totalBudget += budget;

  res.status(201).json({ message: 'Envelope created', envelope });
};

// Get all envelopes
const getAllEnvelopes = (req, res) => {
  res.status(200).json(envelopes);
};

// Get an envelope by ID
const getEnvelopeById = (req, res) => {
  const envelopeId = parseInt(req.params.id, 10);
  const envelope = envelopes.find(env => env.id === envelopeId);

  if (envelope) {
    res.status(200).json(envelope);
  } else {
    res.status(404).json({ error: 'Envelope not found' });
  }
}

// Update an envelope
const updateEnvelope = (req, res) => {
  const envelopeId = parseInt(req.params.id, 10);
  const { title, budget, amount } = req.body;

  const envelope = envelopes.find(env => env.id === envelopeId);

  if (!envelope) {
    return res.status(404).json({ error: 'Envelope not found' });
  }

  if (title) {
    envelope.title = title;
  }

  if (budget !== undefined) {
    if (typeof budget !== 'number' || budget < 0) {
      return res.status(400).json({ error: 'Invalid budget value' });
    }
    envelope.budget = budget;
  }

  if (amount !== undefined) {
    if (typeof amount !== 'number' || amount < 0) {
      return res.status(400).json({ error: 'Invalid amount value' });
    }
    if (envelope.budget < amount) {
      return res.status(400).json({ error: 'Insufficient funds in the envelope' });
    }
    envelope.budget -= amount;
  }

  res.status(200).json({ message: 'Envelope updated', envelope });
}

// Delete specific envelope
const deleteEnvelope = (req, res) => {
  const envelopeId = parseInt(req.params.id, 10);
  const envelopeIndex = envelopes.findIndex(env => env.id === envelopeId);

  if (envelopeIndex !== -1) {
    const deletedEnvelope = envelopes[envelopeIndex];

    // Remove the envelope from the array by its index
    envelopes.splice(envelopeIndex, 1);
    totalBudget -= deletedEnvelope.budget;

    res.status(200).json({ message: 'Envelope deleted', envelope: deletedEnvelope });
  } else {
    res.status(404).json({ error: 'Envelope not found' });
  }
};

// Transfer funds from one source to another
const transferFunds = (req, res) => {
  const fromId = parseInt(req.params.from, 10);
  const toId = parseInt(req.params.to, 10);
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid transfer amount' });
  }

  const fromEnvelope = envelopes.find(env => env.id === fromId);
  const toEnvelope = envelopes.find(env => env.id === toId);

  if (!fromEnvelope || !toEnvelope) {
    return res.status(404).json({ error: 'One or both envelopes not found' });
  }

  if (fromEnvelope.budget < amount) {
    return res.status(400).json({ error: 'Insufficient funds in the source envelope' });
  }

  // Transfer the funds
  fromEnvelope.budget -= amount;
  toEnvelope.budget += amount;

  res.status(200).json({ message: 'Funds transferred successfully', fromEnvelope, toEnvelope });
};

module.exports = { createEnvelope, getAllEnvelopes, getEnvelopeById, updateEnvelope, deleteEnvelope, transferFunds };

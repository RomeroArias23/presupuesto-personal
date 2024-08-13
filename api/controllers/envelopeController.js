const Envelope = require('../models/envelope');
const Transaction = require('/Users/diegoromero/Coding/backend projects/presupuesto-personal/models/transactions.js');

// Create an envelope
const createEnvelope = async (req, res) => {
  const { title, budget } = req.body;

  if (!title || !budget || typeof budget !== 'number' || budget < 0) {
    return res.status(400).json({ error: 'Invalid title or budget' });
  }

  try {
    const envelope = await Envelope.create({ title, budget });
    res.status(201).json({ message: 'Envelope created', envelope });
  } catch (error) {
    res.status(500).json({ error: 'Error creating envelope', details: error.message });
  }
};

// Get all envelopes
const getAllEnvelopes = async (req, res) => {
  try {
    const envelopes = await Envelope.findAll();
    res.status(200).json(envelopes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching envelopes', details: error.message });
  }
};

// Get an envelope by ID
const getEnvelopeById = async (req, res) => {
  const envelopeId = parseInt(req.params.id, 10);
  if (isNaN(envelopeId)) {
    return res.status(400).json({ error: 'Invalid envelope ID' });
  }

  try {
    const envelope = await Envelope.findByPk(envelopeId);
    if (envelope) {
      res.status(200).json(envelope);
    } else {
      res.status(404).json({ error: 'Envelope not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching envelope', details: error.message });
  }
};

// Update an envelope
const updateEnvelope = async (req, res) => {
  const envelopeId = parseInt(req.params.id, 10);
  if (isNaN(envelopeId)) {
    return res.status(400).json({ error: 'Invalid envelope ID' });
  }

  const { title, budget, amount } = req.body;

  try {
    const envelope = await Envelope.findByPk(envelopeId);
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

      // Create a transaction for the withdrawal
      await Transaction.create({ envelope_id: envelopeId, amount, type: 'withdrawal' });
    }

    await envelope.save();
    res.status(200).json({ message: 'Envelope updated', envelope });
  } catch (error) {
    res.status(500).json({ error: 'Error updating envelope', details: error.message });
  }
};

// Delete an envelope
const deleteEnvelope = async (req, res) => {
  const envelopeId = parseInt(req.params.id, 10);
  if (isNaN(envelopeId)) {
    return res.status(400).json({ error: 'Invalid envelope ID' });
  }

  try {
    const envelope = await Envelope.findByPk(envelopeId);
    if (!envelope) {
      return res.status(404).json({ error: 'Envelope not found' });
    }

    await envelope.destroy();
    res.status(200).json({ message: 'Envelope deleted', envelope });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting envelope', details: error.message });
  }
};

// Transfer funds between envelopes
const transferFunds = async (req, res) => {
  const fromId = parseInt(req.params.from, 10);
  const toId = parseInt(req.params.to, 10);
  const { amount } = req.body;

  if (isNaN(fromId) || isNaN(toId) || !amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid transfer parameters' });
  }

  try {
    const fromEnvelope = await Envelope.findByPk(fromId);
    const toEnvelope = await Envelope.findByPk(toId);

    if (!fromEnvelope || !toEnvelope) {
      return res.status(404).json({ error: 'One or both envelopes not found' });
    }

    if (fromEnvelope.budget < amount) {
      return res.status(400).json({ error: 'Insufficient funds in the source envelope' });
    }

    fromEnvelope.budget -= amount;
    toEnvelope.budget += amount;

    await fromEnvelope.save();
    await toEnvelope.save();

    // Create transactions for the transfer
    await Transaction.create({ envelope_id: fromId, amount, type: 'transfer-out' });
    await Transaction.create({ envelope_id: toId, amount, type: 'transfer-in' });

    res.status(200).json({ message: 'Funds transferred successfully', fromEnvelope, toEnvelope });
  } catch (error) {
    res.status(500).json({ error: 'Error transferring funds', details: error.message });
  }
};

module.exports = { createEnvelope, getAllEnvelopes, getEnvelopeById, updateEnvelope, deleteEnvelope, transferFunds };
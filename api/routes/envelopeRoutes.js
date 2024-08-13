const express = require('express');
const router = express.Router();
const { createEnvelope, getAllEnvelopes, getEnvelopeById, updateEnvelope, deleteEnvelope, transferFunds } = require('../controllers/envelopeController');

router.post('/envelopes', createEnvelope);
router.get('/envelopes', getAllEnvelopes);
router.get('/envelopes/:id', getEnvelopeById);
router.put('/envelopes/:id', updateEnvelope);
router.delete('/envelopes/:id', deleteEnvelope);
router.post('/envelopes/transfer/:from/:to', transferFunds);

module.exports = router;

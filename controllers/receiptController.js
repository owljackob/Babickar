const express = require('express');
const ReceiptService = require('../services/receiptService');

const router = express.Router();
const receiptService = new ReceiptService();

router.post('/receipts', async (req, res) => {
  try {
    const { name } = req.body;
    const receipt = await receiptService.createReceipt(name);
    res.status(201).json(receipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/receipts/:id', async (req, res) => {
  try {
    const receipt = await receiptService.getReceiptById(req.params.id);
    res.json(receipt);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
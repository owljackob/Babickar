const express = require('express');
const ReceiptController = require('../controllers/receiptController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/api', ReceiptController);

module.exports = router;
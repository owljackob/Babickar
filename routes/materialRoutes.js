const express = require('express');
const MaterialController = require('../controllers/materialController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/api/materialsApi', MaterialController);

module.exports = router;
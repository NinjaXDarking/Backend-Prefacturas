const express = require('express');
const router = express.Router();

const { 
    getAllProductsCont
} = require('../controllers/product');

router.post('/todos', getAllProductsCont);

module.exports = router;

const express = require('express');
const router = express.Router();

const { 
    getAllProductsCont
} = require('../controllers/product');

router.get('/todos', getAllProductsCont);

module.exports = router;

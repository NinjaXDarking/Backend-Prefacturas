const express = require('express');
const router = express.Router();

const { 
    getAllClientsCont
} = require('../controllers/client');

router.post('/todos', getAllClientsCont);

module.exports = router;

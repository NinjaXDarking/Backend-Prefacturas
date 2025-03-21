const express = require('express');
const router = express.Router();

const { 
    getAllClientsCont,
    insertClientCont
} = require('../controllers/client');

router.post('/todos', getAllClientsCont);
router.post('/insertar', insertClientCont);

module.exports = router;

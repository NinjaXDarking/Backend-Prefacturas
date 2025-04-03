const express = require('express');
const router = express.Router();

const { 
    insertPrefacturesCont
} = require('../controllers/prefacture');

router.post('/insertar', insertPrefacturesCont);


module.exports = router;

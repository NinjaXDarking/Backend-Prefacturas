const express = require('express');
const router = express.Router();
const encryptMiddleware = require("../middlewares/encrypt");

const { 
    getLogin
} = require('../controllers/user');

router.post('/login', encryptMiddleware, getLogin);



module.exports = router;

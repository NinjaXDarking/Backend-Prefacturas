const client = require('../models/client');

const getAllClientsCont = async (req, res) => {
    const { USER, PASS, SERVER, DB } = req.body;
    try {
        const result = await client.getAllClients(USER, PASS, SERVER, DB);
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { getAllClientsCont };
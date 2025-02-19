const client = require('../models/client');

const getAllClientsCont = async (req, res) => {
    try {
        const result = await client.getAllClients();
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { getAllClientsCont };
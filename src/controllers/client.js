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

const insertClientCont = async (req, res) => {
    const { USER, PASS, SERVER, DB, TYPEI, CEDULA, NAME, BUSINESSNAME, EMAIL, PHONENUMBER1 } = req.body;
    try {
        const result = await client.insertClient( USER, PASS, SERVER, DB, TYPEI, CEDULA, NAME, BUSINESSNAME, EMAIL, PHONENUMBER1);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { 
    getAllClientsCont,
    insertClientCont
 };
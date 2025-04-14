const prefacture = require('../models/prefacture');

const insertPrefacturesCont = async (req, res) => {
    const { USER, PASS, SERVER, DB, IdUsuario, CodCliente, NombreCliente, Subtotal, Iva, Total, ListProduct } = req.body;

    try {
        const result = await prefacture.insertPrefactures(USER, PASS, SERVER, DB, IdUsuario, CodCliente, NombreCliente, Subtotal, Iva, Total, ListProduct);
        //res.status(200).json(result);
        res.status(200)
        res.send("Bueno");

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { 
    insertPrefacturesCont
 };
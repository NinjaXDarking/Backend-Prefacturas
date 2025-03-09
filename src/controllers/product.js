const product = require('../models/product');

const getAllProductsCont = async (req, res) => {
    const { USER, PASS, SERVER, DB } = req.body;
    try {
        const result = await product.getAllProducts(USER, PASS, SERVER, DB);
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { getAllProductsCont };
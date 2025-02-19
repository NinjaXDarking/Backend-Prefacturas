const product = require('../models/product');

const getAllProductsCont = async (req, res) => {
    try {
        const result = await product.getAllProducts();
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { getAllProductsCont };
const user = require('../models/user');

const getLogin = async (req, res) => {
    const { USER, PASS, SERVER, DB, USERNAME, KEY } = req.body;
    try {
        const result = await user.getLogin(USER, PASS, SERVER, DB, USERNAME, KEY);
        res.status(200).json(result);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

module.exports = { getLogin };
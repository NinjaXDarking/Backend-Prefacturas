const { sql, getConnection } = require('../configuration/db');

const getAllProducts = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('Exec dbo.App_BusquedaProductos');
        return result.recordset;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getAllProducts };
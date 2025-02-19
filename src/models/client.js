const { sql, getConnection } = require('../configuration/db');

const getAllClients = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('Exec dbo.App_BusquedaClientes');
        return result.recordset;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getAllClients };
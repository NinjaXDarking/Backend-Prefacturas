const connection = require('../configuration/db');

const getAllClients = async (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE) => {
    let pool;
    try {
        pool = await connection.getConnection(DB_USER, DB_PASS, DB_SERVER, DB_DATABASE);
        const result = await pool.request().query('Exec dbo.App_BusquedaClientes');
        return result.recordset;
    } catch (error) {
        throw new Error(error);
    } finally {
        if (pool) {
            pool.close(); // Cierra la conexión si se estableció
        }
    }
}

module.exports = { getAllClients };
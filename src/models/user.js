const connection = require('../configuration/db');

const getLogin = async (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE, USERNAME, KEY) => {
    let pool;
    try {
        pool = await connection.getConnection(DB_USER, DB_PASS, DB_SERVER, DB_DATABASE);
        const result = await pool.request()
        .input('Username', connection.sql.VarChar, USERNAME)
        .input('Key', connection.sql.VarChar, KEY)
        .query('Exec dbo.App_Login @Username, @Key');
        return result.recordset;
    } catch (error) {
        throw new Error(error);
    } finally {
        if (pool) {
            pool.close(); // Cierra la conexión si se estableció
        }
    }
}

module.exports = { getLogin };
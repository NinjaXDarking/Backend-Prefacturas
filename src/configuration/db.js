const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    pool: {
        max: 10, // Máximo de conexiones en el pool
        min: 0,  // Mínimo de conexiones
        idleTimeoutMillis: 30000 // Tiempo antes de cerrar conexión inactiva
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let poolPromise;

const getConnection = async () => {
    if (!poolPromise) {
        poolPromise = new sql.ConnectionPool(dbConfig)
            .connect()
            .then(pool => {
                console.log("Conectado a SQL Server");
                return pool;
            })
            .catch(err => {
                console.error("Error en la conexión a SQL Server:", err);
                poolPromise = null; // Resetear para volver a intentar conexión
                throw err;
            });
    }
    return poolPromise;
};

module.exports = { sql, getConnection };

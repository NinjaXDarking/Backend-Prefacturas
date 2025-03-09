const sql = require('mssql');
//require('dotenv').config();

const dbConfig = (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE) => {
    return {
        user: DB_USER,
        password: DB_PASS,
        server: DB_SERVER,  
        database: DB_DATABASE,
        pool: {
            max: 10,  // Máximo de conexiones en el pool
            min: 0,  // Mínimo de conexiones
            idleTimeoutMillis: 1000 // Tiempo antes de cerrar conexión inactiva
        },
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    };
};


const getConnection = async (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE) => {
    let pool;
    try {        
        const config = dbConfig(DB_USER, DB_PASS, DB_SERVER, DB_DATABASE);
        pool = await sql.connect(config);
        return pool; 

    } catch (err) {
        throw err;
    }
};

module.exports = { sql, getConnection, dbConfig };

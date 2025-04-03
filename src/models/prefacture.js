const connection = require('../configuration/db');

const insertPrefactures = async (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE, CodCliente, NombreCliente, Subtotal, Iva, Total, ListProduct ) => {
    let pool;
    try {
        //pool = await connection.getConnection(DB_USER, DB_PASS, DB_SERVER, DB_DATABASE);
        
        
        //const result = await pool.request().query('Exec dbo.App_BusquedaProductos');
        
        const result = {
            success: true,
            message: "Datos obtenidos correctamente",
            NombreCliente: NombreCliente,
            Subtotal: Subtotal,
            Iva: Iva,
            Total: Total,
            ListProduct: ListProduct
        };
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(error);
    } finally {
        if (pool) {
            pool.close(); // Cierra la conexión si se estableció
        }
    }
}

module.exports = { 
    insertPrefactures
 };


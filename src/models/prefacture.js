const sql = require('mssql');
const connection = require('../configuration/db');

const insertPrefactures = async (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE, IdUsuario, CodCliente, NombreCliente, Subtotal, Iva, Total, ListProduct ) => {
    let pool;
    try {
        pool = await connection.getConnection(DB_USER, DB_PASS, DB_SERVER, DB_DATABASE);
        
        const productTable = new sql.Table('ListaProductosType'); // Debe coincidir con el TYPE en SQL Server
            productTable.columns.add('Codigo', sql.Int);
            productTable.columns.add('Descripcion', sql.VarChar(250));
            productTable.columns.add('Cantidad', sql.Float);
            productTable.columns.add('Precio', sql.Float);
            productTable.columns.add('Porcentaje', sql.Float);

        ListProduct.forEach(product => {
            productTable.rows.add(
                parseInt(product.Codigo), 
                product.Descripcion, 
                parseFloat(product.Existencia), 
                parseFloat(product.PrecioA), 
                parseFloat(product.porcentaje)
            );
        });
        
        const result = await pool.request()
            .input('IdUsuario', sql.Int, parseInt(IdUsuario))
            .input('CodCliente', sql.Int, parseInt(CodCliente))
            .input('NombreCliente', sql.VarChar(250), NombreCliente)
            .input('SubTotal', sql.Float, parseFloat(Subtotal))
            .input('TotalImpuesto', sql.Float, parseFloat(Iva))
            .input('Total', sql.Float, parseFloat(Total))
            .input('ListaProductos', productTable)  // Pasar el TVP como parámetro
            .execute('APP_InsertPrefactura');
        
        return { success: true, message: 'Prefactura creada exitosamente', data: result.recordset };

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


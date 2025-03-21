const connection = require('../configuration/db');

const getAllClients = async (DB_USER, DB_PASS, DB_SERVER, DB_DATABASE) => {
    let pool;
    try {
        console.log(DB_DATABASE);

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

const insertClient = async ( DB_USER, DB_PASS, DB_SERVER, DB_DATABASE, TYPEI, CEDULA, NAME, BUSINESSNAME, EMAIL, PHONENUMBER1) => {
    let pool;
    const fechaActual = new Date();

    try {
        console.log("Inserting client");
        console.log(DB_USER);
        console.log(DB_PASS);
        console.log(DB_SERVER);
        console.log(DB_DATABASE);
        console.log(TYPEI);
        console.log(CEDULA);
        console.log(NAME);
        console.log(BUSINESSNAME);
        console.log(EMAIL);
        console.log(PHONENUMBER1);
        pool = await connection.getConnection(DB_USER, DB_PASS, DB_SERVER, DB_DATABASE);
        const result = await pool.request()
        .input('TipoI', connection.sql.VarChar, TYPEI)
        .input('Cedula', connection.sql.VarChar, CEDULA)
        .input('Nombre', connection.sql.VarChar, NAME)
        .input('NombreComercial', connection.sql.VarChar, BUSINESSNAME)
        .input('Email', connection.sql.VarChar, EMAIL)
        .input('FechaNacimiento', connection.sql.Date, fechaActual)
        .input('CodPaisT', connection.sql.VarChar, "506")
        .input('Telefono1', connection.sql.VarChar, PHONENUMBER1)
        .input('Telefono2', connection.sql.VarChar, PHONENUMBER1)
        .input('Celular', connection.sql.VarChar, PHONENUMBER1)
        .input('CodPiasF', connection.sql.VarChar, "506")
        .input('Fax01', connection.sql.VarChar, "")
        .input('Fax02', connection.sql.VarChar, "")
        .input('IdLocalidad', connection.sql.Int, 0)
        .input('IdProvincia', connection.sql.Int, 0)
        .input('IdCanton', connection.sql.Int, 0)
        .input('IdDistrito', connection.sql.Int, 0 )
        .input('IdBarrio', connection.sql.Int, 0)
        .input('Direccion', connection.sql.VarChar, "")
        .input('Contacto', connection.sql.VarChar, "")
        .input('TelContacto', connection.sql.VarChar, "")
        .input('Observaciones', connection.sql.VarChar, "")
        .input('Credito', connection.sql.Bit, 0)
        .input('CodMoneda', connection.sql.Int, 0)
        .input('LimiteCredito', connection.sql.Float, 0.0)
        .input('PlazoCredito', connection.sql.Int, 0)
        .input('TipoPrecio', connection.sql.Int, 0)
        .input('Restriccion', connection.sql.Bit,  0)
        .input('Moroso', connection.sql.Bit, 0)
        .input('InHabilitado', connection.sql.Bit, 0)
        .input('FechaIngreso', connection.sql.DateTime, fechaActual)
        .input('IdAgente', connection.sql.Int, 0)
        .input('PermiteDescuento', connection.sql.Bit, 0)
        .input('Descuento', connection.sql.Float, 0.0)
        .input('MaxDescuento', connection.sql.Float, 0.0)
        .input('FE', connection.sql.Bit, 0)
        .input('Exonerar', connection.sql.Bit, 0)
        .input('TipoExonerar', connection.sql.VarChar, "")
        .input('Documento', connection.sql.VarChar, "")
        .input('Institucion', connection.sql.VarChar, "")
        .input('FechaEmision', connection.sql.DateTime, fechaActual)
        .input('PorcentajeExonerar', connection.sql.Int, 0)

        .query('Exec dbo.InsertClientes @TipoI, @Cedula, @Nombre, @NombreComercial, @Email, @FechaNacimiento, @CodPaisT, @Telefono1, @Telefono2, @Celular, @CodPiasF, @Fax01, @Fax02, @IdLocalidad, @IdProvincia, @IdCanton, @IdDistrito, @IdBarrio, @Direccion, @Contacto, @TelContacto, @Observaciones, @Credito, @CodMoneda, @LimiteCredito, @PlazoCredito, @TipoPrecio, @Restriccion, @Moroso, @InHabilitado, @FechaIngreso, @IdAgente, @PermiteDescuento, @Descuento, @MaxDescuento, @FE, @Exonerar, @TipoExonerar, @Documento, @Institucion, @FechaEmision, @PorcentajeExonerar');
        return result.recordset;
    } catch (error) {
        throw new Error(error);
    } finally {
        if (pool) {
            pool.close(); // Cierra la conexión si se estableció
        }
    }
}

module.exports = { 
    getAllClients,
    insertClient
 };
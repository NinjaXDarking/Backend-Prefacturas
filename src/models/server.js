//require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const dbConnect = require("./src/config/db");

class server{
  constructor(){
    this.app = express();
    this.port =  8080;
    this.product = '/api/productos';
    this.client = '/api/clientes';
    this.user = '/api/usuarios';
    this.user = '/api/prefacturas';

    this.server = null; // Definir la propiedad en el constructor

    
    // Middlewares
    this.middlewares();
    // Rutas de la aplicación
    this.routes();
  }

  middlewares(){
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
  }

  routes(){
    this.app.use(this.product, require("../routers/product"));
    this.app.use(this.client, require("../routers/client"));
    this.app.use(this.user, require("../routers/user"));
    this.app.use(this.user, require("../routers/prefacture"));
  }


  listen(){
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });

        // Manejo de cierre del servidor para evitar errores con nodemon
    process.on("SIGTERM", this.shutdown.bind(this));
    process.on("SIGINT", this.shutdown.bind(this));
  }

  shutdown() {
    if (this.server) {
      console.log("⚠️ Interrupción detectada. Cerrando servidor...");
      this.server.close(() => {
        console.log("✅ Servidor cerrado.");
        process.exit(0);
      });
    }
  }

}

module.exports = server;

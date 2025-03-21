const crypto = require("crypto");

const myKey = "@NewSoft"; // Clave secreta

function generate3DESKey(keyString) {
    // 1️⃣ Generar el hash MD5 de la clave secreta
    const md5 = crypto.createHash("md5");
    md5.update(keyString, "utf16le");
    const key = md5.digest(); // Esto genera 16 bytes

    // 2️⃣ Hacer que la clave tenga 24 bytes (192 bits) duplicando los primeros 8 bytes
    return Buffer.concat([key, key.slice(0, 8)]); // Ahora tiene 24 bytes
}

function encriptarTripleDES(texto) {
    try {
        if (!texto) return null;

        // Generar clave válida para 3DES
        const key = generate3DESKey(myKey);

        // Crear el cifrador TripleDES en modo ECB
        const cipher = crypto.createCipheriv("des-ede3", key, null);
        cipher.setAutoPadding(true);

        // Encriptar el texto
        const encrypted = Buffer.concat([
            cipher.update(Buffer.from(texto, "ascii")),
            cipher.final(),
        ]);

        return encrypted.toString("base64"); // Convertir a Base64
    } catch (error) {
        console.error("Error al encriptar:", error);
        return null;
    }
}

// Middleware para encriptar la clave antes de enviarla a la BD
const encryptMiddleware = (req, res, next) => {
    if (!req.body.KEY) {
        return res.status(400).json({ mensaje: "Falta la clave en la petición" });
    }

    req.body.KEY = encriptarTripleDES(req.body.KEY);

    if (!req.body.KEY) {
        return res.status(500).json({ mensaje: "Error al encriptar la clave" });
    }

    next();
};

module.exports = encryptMiddleware;

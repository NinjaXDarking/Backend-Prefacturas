const crypto = require("crypto");

const myKey = "@NewSoft"; // Clave secreta (debe ser la misma que en VB.NET)

function desencriptarTripleDES(encryptedText) {
    try {
        if (!encryptedText) return null;

        // Generar clave MD5 (igual que en VB.NET)
        const md5 = crypto.createHash("md5");
        md5.update(myKey, "utf16le");
        const key = md5.digest();

        // Crear descifrador TripleDES en modo ECB
        const decipher = crypto.createDecipheriv("des-ede3", key, null);
        decipher.setAutoPadding(true);

        // Convertir el texto encriptado de Base64 a Buffer y desencriptarlo
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encryptedText, "base64")),
            decipher.final(),
        ]);

        return decrypted.toString("ascii"); // Devuelve la clave desencriptada
    } catch (error) {
        console.error("Error al desencriptar:", error);
        return null;
    }
}

// Middleware para desencriptar la clave antes de procesar el login
const descryptMiddleware = (req, res, next) => {
    if (!req.body.clave) {
        return res.status(400).json({ mensaje: "Falta la clave en la petición" });
    }

    // Desencriptar la clave del request y agregarla a req.body
    req.body.claveDesencriptada = desencriptarTripleDES(req.body.clave);

    if (!req.body.claveDesencriptada) {
        return res.status(400).json({ mensaje: "Error al desencriptar la clave" });
    }

    next(); // Continuar con el controlador
};

module.exports = descryptMiddleware;

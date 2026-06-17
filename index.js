import express from 'express';
import { pool } from './db.js';


const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json()); // Permite a la app entender formato JSON

// ENDPOINT: Obtener los datos de la base de datos
app.get('/usuarios', async (req, res) => {
    try {
        // Consulta SQL para obtener los registros
        const result = await pool.query('SELECT * FROM usuarios');

        // Responder con los datos en formato JSON
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        // Manejo de errores con bloque catch
        console.error('Error al obtener los datos de la BD:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al procesar la solicitud.'
        });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
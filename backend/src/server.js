const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Habilita CORS para todas las solicitudes
app.use(cors());

// Rutas de ejemplo
app.get('/localidades', async (req, res) => {
    try {
        const response = await axios.get('https://infra.datos.gob.ar/georef/localidades.json');
        res.json(response.data);
      } catch (error) {
        console.error('Error al obtener las localidades:', error);
        res.status(500).json({ error: 'Error al obtener las localidades' });
      }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

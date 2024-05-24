const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const axios = require('axios');


app.use(express.json());

app.use(cors());

app.get('/localidades', async (req, res) => {
    try {
      const response = await axios.get('https://infra.datos.gob.ar/georef/localidades.json');
      const localidades = response.data.localidades;
  
      // Ordenar las localidades por nombre de provincia y nombre de ciudad
      localidades.sort((a, b) => {
        // Ordenar por nombre de provincia
        const provinciaComparison = a.provincia.nombre.localeCompare(b.provincia.nombre);
        if (provinciaComparison !== 0) {
          return provinciaComparison;
        }
        // Si las provincias son iguales, ordenar por nombre de ciudad
        return a.nombre.localeCompare(b.nombre);
      });
  
      res.json({ localidades });
    } catch (error) {
      console.error('Error al obtener las localidades:', error);
      res.status(500).json({ error: 'Error al obtener las localidades' });
    }
  });

  app.get('/zipCodes', (req, res) => {
    try {
      // Ruta al archivo JSON
      const filePath = path.join(__dirname, '..', 'api', 'zipCodesArgentina.json');
      // Lee el archivo JSON
      const jsonData = fs.readFileSync(filePath, 'utf8');
      // Parsea el JSON a objeto JavaScript
      const data = JSON.parse(jsonData);
      // Envía el objeto como respuesta
      res.json(data);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
      res.status(500).json({ error: 'Error al obtener los códigos postales' });
    }
  });


  app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        // Realizar la búsqueda en el JSON
        const zipCodes = await getZipCodes(); // Obtener los códigos postales
        const results = searchInJson(zipCodes, query); // Realizar la búsqueda
        res.json(results);
    } catch (error) {
        console.error('Error al buscar:', error);
        res.status(500).json({ error: 'Error al buscar' });
    }
});

async function getZipCodes() {
    try {
        // Ruta al archivo JSON
        const filePath = path.join(__dirname, '..', 'api', 'zipCodesArgentina.json');
        // Lee el archivo JSON y parsea el contenido
        const jsonData = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

function searchInJson(zipCodes, query) {
    const results = [];
    // Recorrer el JSON para buscar coincidencias con la consulta
    for (const province in zipCodes) {
        for (const city in zipCodes[province]) {
            const zipCodesInCity = zipCodes[province][city];
            for (const zipCode in zipCodesInCity) {
                // Verificar que zipCode no sea nulo o indefinido
                if (zipCode && zipCodesInCity.hasOwnProperty(zipCode)) {
                    // Verificar que zipCode sea una cadena antes de intentar llamar a toLowerCase()
                    if (typeof zipCode === 'string' && zipCode.toLowerCase().includes(query.toLowerCase())) {
                        results.push({
                            province: province,
                            city: city,
                            zipCode: zipCode
                        });
                    }
                }
            }
        }
    }
    return results;
}

  


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

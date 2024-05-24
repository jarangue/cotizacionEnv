import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, TextField, Button, Select, MenuItem } from '@mui/material';

const SucursalesList = () => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [provincia, setProvincia] = useState('AR-B'); 

  const provincias = [
    { code: 'AR-A', name: 'Salta' },
    { code: 'AR-B', name: 'Provincia de Buenos Aires' },
    { code: 'AR-C', name: 'Ciudad Autónoma de Buenos Aires' },
    { code: 'AR-D', name: 'San Luis' },
    { code: 'AR-E', name: 'Entre Ríos' },
    { code: 'AR-F', name: 'La Rioja' },
    { code: 'AR-G', name: 'Santiago del Estero' },
    { code: 'AR-H', name: 'Chaco' },
    { code: 'AR-J', name: 'San Juan' },
    { code: 'AR-K', name: 'Catamarca' },
    { code: 'AR-L', name: 'La Pampa' },
    { code: 'AR-M', name: 'Mendoza' },
    { code: 'AR-N', name: 'Misiones' },
    { code: 'AR-P', name: 'Formosa' },
    { code: 'AR-Q', name: 'Neuquén' },
    { code: 'AR-R', name: 'Río Negro' },
    { code: 'AR-S', name: 'Santa Fe' },
    { code: 'AR-T', name: 'Tucumán' },
    { code: 'AR-U', name: 'Chubut' },
    { code: 'AR-V', name: 'Tierra del Fuego' },
    { code: 'AR-W', name: 'Corrientes' },
    { code: 'AR-X', name: 'Córdoba' },
    { code: 'AR-Y', name: 'Jujuy' },
    { code: 'AR-Z', name: 'Santa Cruz' },
  ];

  const fetchSucursales = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://correo-argentino1.p.rapidapi.com/obtenerSucursales',
      headers: {
        'X-RapidAPI-Key': '505cb41effmsh9cc0fa32dd9df2dp1bc751jsna8fbb55d670c',
        'X-RapidAPI-Host': 'correo-argentino1.p.rapidapi.com'
      },
      params: {
        provincia: provincia
      }
    };

    try {
      const response = await axios.request(options);
      setSucursales(response.data);
    } catch (error) {
      setError('Error al obtener las sucursales');
    } finally {
      setLoading(false);
    }
  };

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Sucursales</Typography>
      <Select value={provincia} onChange={handleProvinciaChange}>
        {provincias.map((provincia) => (
          <MenuItem key={provincia.code} value={provincia.code}>
            {provincia.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={fetchSucursales} disabled={loading}>
        Obtener Sucursales
      </Button>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {sucursales.map((sucursal, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Sucursal: ${sucursal.nombre_sucursal}`}
              secondary={`Código: ${sucursal.codigo_sucursal} - Provincia: ${sucursal.nombre_provincia}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SucursalesList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

const Localidades = () => {
  const [localidades, setLocalidades] = useState([]);
  const [provincia, setProvincia] = useState('');
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    const fetchLocalidades = async () => {
      try {
        const response = await axios.get('http://localhost:3001/localidades');
        console.log(response.data.localidades);
        setLocalidades(response.data.localidades);
      } catch (error) {
        console.error('Error al obtener las localidades:', error);
      }
    };

    fetchLocalidades();
  }, []);

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
    setCiudad('');
  };

  const handleCiudadChange = (event) => {
    setCiudad(event.target.value);
  };

  return (
    <>
      <Select value={provincia} onChange={handleProvinciaChange} fullWidth>
        <MenuItem value="">Selecciona una Provincia</MenuItem>
        {Array.from(new Set(localidades.map((localidad) => localidad.provincia.nombre))).map((provincia, index) => (
          <MenuItem key={index} value={provincia}>{provincia}</MenuItem>
        ))}
      </Select>
      <Select value={ciudad} onChange={handleCiudadChange} fullWidth disabled={!provincia}>
        <MenuItem value="">Selecciona una Ciudad</MenuItem>
        {localidades.filter((localidad) => localidad.provincia.nombre === provincia).map((localidad, index) => (
          <MenuItem key={index} value={localidad.nombre}>{localidad.nombre}</MenuItem>
        ))}
      </Select>
    </>
  );
};

export default Localidades;

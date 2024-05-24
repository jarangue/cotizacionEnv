import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';

const ZipCodes = () => {
    const [zipCodes, setZipCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Define la función fetchZipCodes fuera del useEffect
    const fetchZipCodes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/zipCodes');
            setZipCodes(response.data);
        } catch (error) {
            setError('Error al obtener los códigos postales');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Códigos Postales</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={fetchZipCodes} 
                disabled={loading}
                sx={{ mt: 2 }}
            >
                Obtener Códigos Postales
            </Button>
            {loading && <Typography variant="body1">Cargando...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {zipCodes.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">Códigos Postales:</Typography>
                    <pre>{JSON.stringify(zipCodes, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
};

export default ZipCodes;

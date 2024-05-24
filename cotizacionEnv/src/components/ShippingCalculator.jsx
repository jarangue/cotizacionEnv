import  { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';

const ShippingCalculator = () => {
    const [shippingData, setShippingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        cpOrigen: '1000',
        cpDestino: '2000',
        provinciaOrigen: 'AR-B',
        provinciaDestino: 'AR-S',
        peso: '5'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const calculateShipping = async () => {
        setLoading(true);
        setError(null);
        const options = {
            method: 'POST',
            url: 'https://correo-argentino1.p.rapidapi.com/calcularPrecio',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '505cb41effmsh9cc0fa32dd9df2dp1bc751jsna8fbb55d670c',
                'X-RapidAPI-Host': 'correo-argentino1.p.rapidapi.com'
            },
            data: formData
        };

        try {
            const response = await axios.request(options);
            setShippingData(response.data);
        } catch (error) {
            setError('Error al calcular el costo de envío');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Calculadora de Envío</Typography>
            <TextField
                label="Código Postal Origen"
                name="cpOrigen"
                value={formData.cpOrigen}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Código Postal Destino"
                name="cpDestino"
                value={formData.cpDestino}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Provincia Origen"
                name="provinciaOrigen"
                value={formData.provinciaOrigen}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Provincia Destino"
                name="provinciaDestino"
                value={formData.provinciaDestino}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Peso"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={calculateShipping}
                disabled={loading}
                sx={{ mt: 2 }}
            >
                Calcular Costo de Envío
            </Button>
            {loading && <Typography variant="body1">Calculando...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {shippingData && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">Resultado:</Typography>
                    <pre>{JSON.stringify(shippingData, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
};

export default ShippingCalculator;

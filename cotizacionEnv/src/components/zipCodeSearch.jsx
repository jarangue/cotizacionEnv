// import { useState } from 'react';
// import axios from 'axios';
// import { Button, TextField, Typography, Box } from '@mui/material';

// const ZipCodeSearch = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleInputChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSearch = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(`http://localhost:3001/search?term=${searchTerm}`);
//             setResults(response.data);
//         } catch (error) {
//             setError('Error al buscar los códigos postales');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{ padding: 2 }}>
//             <Typography variant="h6">Búsqueda de Códigos Postales</Typography>
//             <TextField
//                 label="Ingrese una provincia o ciudad"
//                 value={searchTerm}
//                 onChange={handleInputChange}
//                 fullWidth
//                 margin="normal"
//             />
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSearch}
//                 disabled={loading}
//                 sx={{ mt: 2 }}
//             >
//                 Buscar
//             </Button>
//             {loading && <Typography variant="body1">Buscando...</Typography>}
//             {error && <Typography variant="body1" color="error">{error}</Typography>}
//             <Box sx={{ mt: 2 }}>
//                 <Typography variant="body1">Resultados:</Typography>
//                 <ul>
//                     {results.map((result, index) => (
//                         <li key={index}>
//                             Provincia: {result.provincia}, Ciudad: {result.ciudad}, Código Postal: {result.codigoPostal}
//                         </li>
//                     ))}
//                 </ul>
//             </Box>
//         </Box>
//     );
// };

// export default ZipCodeSearch;

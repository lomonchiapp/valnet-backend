require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API MikroWisp funcionando correctamente' });
});

// Definir rutas para los recursos de MikroWisp
// (Clientes, Planes, Facturas, etc.)

// Ejemplo de ruta para clientes
app.get('/api/clientes', (req, res) => {
  // Aquí iría la lógica para obtener clientes
  res.json({ clientes: [] });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 
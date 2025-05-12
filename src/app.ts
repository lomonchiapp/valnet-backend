import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import routes from './routes';

// Inicialización de la aplicación
const app = express();

// Middlewares globales
app.use(helmet()); // Seguridad
app.use(cors());   // Manejo de CORS
app.use(compression()); // Compresión de respuestas
app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: true })); // Parseo de URL-encoded
app.use(requestLogger); // Logging de solicitudes

// Ruta base de salud para verificar que el servidor está funcionando
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

// Rutas API
app.use('/api', routes);

// Middleware para manejo de errores global
app.use(errorHandler);

export default app; 
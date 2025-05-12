import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clienteRoutes';
import planRoutes from './routes/planRoutes';
import preRegistroRoutes from './routes/preRegistroRoutes';
import facturaRoutes from './routes/facturaRoutes';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'API MikroWisp funcionando correctamente' });
});

// Rutas de recursos
app.use('/api/clientes', clienteRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/v1/GetInvoices', facturaRoutes);
app.use('/api/v1/NewPreRegistro', preRegistroRoutes);

// Interfaz para errores con mensaje
interface ErrorWithMessage extends Error {
  message: string;
}

// Manejador de errores
app.use((err: ErrorWithMessage, _req: Request, res: Response, _next: NextFunction) => {
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
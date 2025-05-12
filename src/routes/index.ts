import { Router } from 'express';
import clienteRoutes from './clienteRoutes';
import preRegistroRoutes from './preRegistroRoutes';
import facturaRoutes from './facturaRoutes';
import ticketRoutes from './ticketRoutes';

const router = Router();

// Rutas de información general
router.get('/', (req, res) => {
  res.json({
    name: 'Valnet API',
    version: '1.0.0',
    status: 'online'
  });
});

// Rutas de MikroWisp
router.use('/v1/GetClientsDetails', clienteRoutes);
//nuevo ticket a soporte
router.use('/v1/NewTicket', ticketRoutes);
//Nuevo PreRegistro
router.use('/v1/NewPreRegistro', preRegistroRoutes);
// Rutas de Facturas
router.use('/v1/GetInvoices', facturaRoutes);

// Aquí se pueden agregar más rutas para otros recursos

export default router; 
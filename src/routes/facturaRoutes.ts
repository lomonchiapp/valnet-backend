import { Router, Request, Response } from 'express';
import { obtenerFacturas, FacturaMikrowispLocal } from '../services/mikrowisp/api';
import { asyncHandler } from '../middleware/asyncHandler';

const router: Router = Router();

/**
 * @route GET /api/v1/GetInvoices
 * @desc Obtener lista de facturas
 * @access Private
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 15, cliente, estado, fechaInicio, fechaFin } = req.query;
  
  try {
    const result = await obtenerFacturas({
      page: Number(page),
      limit: Number(limit),
      cliente: cliente?.toString(),
      estado: estado?.toString(),
      fechaInicio: fechaInicio?.toString(),
      fechaFin: fechaFin?.toString(),
    });
    
    res.json(result);
  } catch (error: any) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}));

/**
 * @route POST /api/v1/GetInvoices
 * @desc Obtener facturas con parámetros específicos en el cuerpo
 * @access Private
 */
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  console.log('Body recibido:', req.body);
  const { token, limit, estado, idcliente, fechapago, formapago } = req.body;
  
  console.log('Token recibido:', token);
  console.log('Parámetros:', { limit, estado, idcliente, fechapago, formapago });
  
  try {
    const result = await obtenerFacturas({
      token,
      limit: Number(limit),
      estado: estado?.toString(),
      idcliente: idcliente?.toString(),
      fechapago: fechapago?.toString(),
      formapago: formapago?.toString()
    });
    
    res.json(result);
  } catch (error: any) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}));

export default router; 
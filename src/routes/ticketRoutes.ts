import { Router, Request, Response } from 'express';
import { crearTicket, NuevoTicket } from '../services/mikrowisp/api';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

/**
 * @route POST /api/v1/NewTicket
 * @desc Crear un nuevo ticket en MikroWisp
 * @access Private
 */
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  console.log('Body recibido para ticket:', req.body);
  
  const { 
    token, 
    idcliente, 
    asunto, 
    mensaje, 
    contenido, 
    dp,
    departamento, // Alias para dp
    prioridad,
    fechavisita,
    turno,
    agendado,
    solicitante,
    adjunto
  } = req.body;
  
  // Usar contenido si está presente, de lo contrario usar mensaje (para compatibilidad)
  const mensajeTicket = contenido || mensaje;
  // Usar dp si está presente, de lo contrario usar departamento (para compatibilidad)
  const departamentoTicket = dp || departamento;
  
  if (!idcliente || !asunto || !mensajeTicket) {
    return res.status(400).json({
      success: false,
      error: 'Se requieren idcliente, asunto y contenido para crear un ticket'
    });
  }
  
  if (!fechavisita || !turno || !agendado) {
    return res.status(400).json({
      success: false,
      error: 'Se requieren fechavisita, turno y agendado para crear un ticket'
    });
  }
  
  try {
    const ticketData: NuevoTicket = {
      token,
      idcliente: Number(idcliente),
      asunto,
      contenido: mensajeTicket,
      dp: departamentoTicket ? Number(departamentoTicket) : 1,
      fechavisita,
      turno,
      agendado,
      solicitante
    };
    
    // Agregar prioridad si está definida
    if (prioridad) {
      ticketData.prioridad = Number(prioridad);
    }
    
    // Agregar adjunto si está definido
    if (adjunto) {
      ticketData.adjunto = adjunto;
    }
    
    console.log('Enviando datos de ticket:', ticketData);
    const result = await crearTicket(ticketData);
    
    res.json(result);
  } catch (error: any) {
    console.error('Error al crear ticket:', error);
    
    // Si la API devuelve un mensaje de error específico, enviarlo al cliente
    if (error.statusCode === 400 || (error.statusCode === 500 && error.message.includes('MikroWisp'))) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message
    });
  }
}));

export default router; 
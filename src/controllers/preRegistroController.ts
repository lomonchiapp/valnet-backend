import { Request, Response, NextFunction } from 'express';
import { PreRegistro, PreRegistroMikrowisp, extractMikrowisp } from 'shared-types';
import { FirestoreService } from '../services/firebase';
import { enviarPreRegistro } from '../services/mikrowisp/api';
import { AppError } from '../middleware/errorHandler';

// Servicio de Firestore para Pre-Registros
const preRegistroService = new FirestoreService<PreRegistro>('preRegistros');

/**
 * Controlador para crear un nuevo pre-registro
 */
export const crearPreRegistro = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Validamos los campos requeridos
    const {
      cliente,
      cedula,
      direccion,
      telefono,
      movil,
      email,
      notas,
      fecha_instalacion,
      clienteReferencia,
      fotoCedula,
      fotoContrato
    } = req.body;

    // Validamos los campos obligatorios según la definición de PreRegistroMikrowisp
    if (!cliente || !cedula || !direccion || !telefono || !movil || !email) {
      throw new AppError('Faltan campos obligatorios para el pre-registro', 400);
    }

    // Obtenemos el token de MikroWisp
    const token = process.env.MIKROWISP_TOKEN;
    if (!token) {
      throw new AppError('Token de MikroWisp no configurado', 500);
    }

    const now = new Date();

    // Crear el objeto completo de pre-registro
    const preRegistroCompleto: Omit<PreRegistro, 'id'> = {
      token,
      cliente,
      cedula,
      direccion,
      telefono,
      movil,
      email,
      notas: notas || '',
      fecha_instalacion: fecha_instalacion || now.toISOString(),
      clienteReferencia: clienteReferencia || '',
      fotoCedula: fotoCedula || '',
      fotoContrato: fotoContrato || [],
      createdAt: now,
      updatedAt: now
    };

    // 1. Extraer solo los datos para MikroWisp
    const datosMikroWisp = extractMikrowisp(preRegistroCompleto as PreRegistro);

    // 2. Enviar datos a MikroWisp
    const respuestaMikroWisp = await enviarPreRegistro(datosMikroWisp);
    if (!respuestaMikroWisp.success) {
      throw new AppError('Error al registrar en MikroWisp', 500);
    }

    // 3. Guardar todos los datos en Firebase
    const nuevoPreRegistro = await preRegistroService.create(preRegistroCompleto as PreRegistro);

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Pre-registro creado exitosamente en MikroWisp y Firebase',
      data: nuevoPreRegistro
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para obtener todos los pre-registros
 */
export const obtenerPreRegistros = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const preRegistros = await preRegistroService.getAll();
    
    res.json({
      success: true,
      data: preRegistros
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para obtener un pre-registro por ID
 */
export const obtenerPreRegistroPorId = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const preRegistro = await preRegistroService.getById(id);
    
    if (!preRegistro) {
      throw new AppError('Pre-registro no encontrado', 404);
    }
    
    res.json({
      success: true,
      data: preRegistro
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para actualizar un pre-registro
 */
export const actualizarPreRegistro = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    
    // No permitir actualizar campos críticos
    delete datosActualizados.id;
    delete datosActualizados.token;
    delete datosActualizados.createdAt;
    
    const preRegistroActualizado = await preRegistroService.update(id, datosActualizados);
    
    res.json({
      success: true,
      message: 'Pre-registro actualizado correctamente',
      data: preRegistroActualizado
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para eliminar un pre-registro
 */
export const eliminarPreRegistro = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const eliminado = await preRegistroService.delete(id);
    
    if (!eliminado) {
      throw new AppError('Pre-registro no encontrado', 404);
    }
    
    res.status(200).json({
      success: true,
      message: 'Pre-registro eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
}; 
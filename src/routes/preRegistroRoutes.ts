import express from 'express';
import {
  crearPreRegistro,
  obtenerPreRegistros,
  obtenerPreRegistroPorId,
  actualizarPreRegistro,
  eliminarPreRegistro
} from '../controllers/preRegistroController';

const router = express.Router();

/**
 * @route   POST /api/pre-registro
 * @desc    Crea un nuevo pre-registro
 * @access  Public
 */
router.post('/', crearPreRegistro);

/**
 * @route   GET /api/pre-registro
 * @desc    Obtiene todos los pre-registros
 * @access  Private
 */
router.get('/', obtenerPreRegistros);

/**
 * @route   GET /api/pre-registro/:id
 * @desc    Obtiene un pre-registro por ID
 * @access  Private
 */
router.get('/:id', obtenerPreRegistroPorId);

/**
 * @route   PUT /api/pre-registro/:id
 * @desc    Actualiza un pre-registro por ID
 * @access  Private
 */
router.put('/:id', actualizarPreRegistro);

/**
 * @route   DELETE /api/pre-registro/:id
 * @desc    Elimina un pre-registro por ID
 * @access  Private
 */
router.delete('/:id', eliminarPreRegistro);

export default router; 
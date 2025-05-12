"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const preRegistroController_1 = require("../controllers/preRegistroController");
const router = express_1.default.Router();
/**
 * @route   POST /api/pre-registro
 * @desc    Crea un nuevo pre-registro
 * @access  Public
 */
router.post('/', preRegistroController_1.crearPreRegistro);
/**
 * @route   GET /api/pre-registro
 * @desc    Obtiene todos los pre-registros
 * @access  Private
 */
router.get('/', preRegistroController_1.obtenerPreRegistros);
/**
 * @route   GET /api/pre-registro/:id
 * @desc    Obtiene un pre-registro por ID
 * @access  Private
 */
router.get('/:id', preRegistroController_1.obtenerPreRegistroPorId);
/**
 * @route   PUT /api/pre-registro/:id
 * @desc    Actualiza un pre-registro por ID
 * @access  Private
 */
router.put('/:id', preRegistroController_1.actualizarPreRegistro);
/**
 * @route   DELETE /api/pre-registro/:id
 * @desc    Elimina un pre-registro por ID
 * @access  Private
 */
router.delete('/:id', preRegistroController_1.eliminarPreRegistro);
exports.default = router;
//# sourceMappingURL=preRegistroRoutes.js.map
import { Request, Response, NextFunction } from 'express';
/**
 * Controlador para crear un nuevo pre-registro
 */
export declare const crearPreRegistro: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Controlador para obtener todos los pre-registros
 */
export declare const obtenerPreRegistros: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Controlador para obtener un pre-registro por ID
 */
export declare const obtenerPreRegistroPorId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Controlador para actualizar un pre-registro
 */
export declare const actualizarPreRegistro: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Controlador para eliminar un pre-registro
 */
export declare const eliminarPreRegistro: (req: Request, res: Response, next: NextFunction) => Promise<void>;

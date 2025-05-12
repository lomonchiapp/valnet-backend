import { Request, Response, NextFunction } from 'express';

/**
 * Clase base para todos los errores de la aplicación
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indica si es un error de operación conocido

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Middleware para manejar errores de forma centralizada
 */
export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Registrar el error
  console.error('Error:', err);

  // Si es un AppError, devolvemos el código de estado y mensaje específico
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Error no controlado
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}; 
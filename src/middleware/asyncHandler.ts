import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para manejar excepciones en rutas asíncronas
 * @param fn Función asíncrona a ejecutar
 */
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}; 
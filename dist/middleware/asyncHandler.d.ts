import { Request, Response, NextFunction } from 'express';
/**
 * Middleware para manejar excepciones en rutas asíncronas
 * @param fn Función asíncrona a ejecutar
 */
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;

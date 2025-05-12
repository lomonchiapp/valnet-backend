import { Request, Response, NextFunction } from 'express';
/**
 * Clase base para todos los errores de la aplicación
 */
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
/**
 * Middleware para manejar errores de forma centralizada
 */
export declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;

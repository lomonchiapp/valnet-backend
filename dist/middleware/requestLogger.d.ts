import { Request, Response, NextFunction } from 'express';
/**
 * Middleware para registrar información sobre cada solicitud
 */
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para registrar información sobre cada solicitud
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Cuando la respuesta se complete
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;
    
    // Formato del log: [MÉTODO] URL - CÓDIGO_ESTADO - DURACIÓN_MS - IP
    console.log(
      `${method} ${originalUrl} - ${statusCode} - ${duration}ms - ${ip}`
    );
  });
  
  next();
}; 
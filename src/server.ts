import dotenv from 'dotenv';
import app from './app';

// Cargar variables de entorno
dotenv.config();

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor solo si no estamos en Vercel
if (process.env.VERCEL_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`⚡️ Servidor Valnet ejecutándose en el puerto ${PORT}`);
    console.log(`🔗 MikroWisp API configurada - Token: ${process.env.MIKROWISP_TOKEN ? '✓' : '✗'}`);
    console.log(`🔥 Firebase configurado - Proyecto: ${process.env.FIREBASE_PROJECT_ID || 'N/A'}`);
  });
}

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
  // En producción, aquí se podría enviar una notificación al equipo de desarrollo
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no manejada:', { reason, promise });
  // En producción, aquí se podría enviar una notificación al equipo de desarrollo
});

// Exportar la app para Vercel
export default app; 
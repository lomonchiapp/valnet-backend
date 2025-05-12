"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
// Cargar variables de entorno
dotenv_1.default.config();
// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
// Iniciar el servidor
app_1.default.listen(PORT, () => {
    console.log(`⚡️ Servidor Valnet ejecutándose en el puerto ${PORT}`);
    console.log(`🔗 MikroWisp API configurada - Token: ${process.env.MIKROWISP_TOKEN ? '✓' : '✗'}`);
    console.log(`🔥 Firebase configurado - Proyecto: ${process.env.FIREBASE_PROJECT_ID || 'N/A'}`);
});
// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
    // En producción, aquí se podría enviar una notificación al equipo de desarrollo
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', { reason, promise });
    // En producción, aquí se podría enviar una notificación al equipo de desarrollo
});
//# sourceMappingURL=server.js.map
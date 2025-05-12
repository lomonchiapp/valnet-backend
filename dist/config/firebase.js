"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.auth = exports.db = void 0;
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
// Configuración de Firebase proporcionada por el cliente
const firebaseConfig = {
    apiKey: "AIzaSyDDWMNLV0V6nz5FOZ2OhIjbJVMLsSBc4lQ",
    authDomain: "valnet-86e94.firebaseapp.com",
    projectId: "valnet-86e94",
    storageBucket: "valnet-86e94.appspot.com",
    messagingSenderId: "185345301720",
    appId: "1:185345301720:web:77e69f2695a0b6c33b8bad",
    measurementId: "G-070GRVFS5Y"
};
let firebaseApp;
// Función para inicializar Firebase
const initializeFirebase = () => {
    try {
        // Verifica si ya hay una app inicializada
        if (admin.apps.length > 0) {
            return admin.app();
        }
        // Verifica si existe un archivo de configuración serviceAccountKey.json
        const serviceAccountPath = path_1.default.join(__dirname, '../../serviceAccountKey.json');
        if (fs_1.default.existsSync(serviceAccountPath)) {
            // Si existe el archivo de credenciales, lo usamos
            console.log('Usando archivo de credenciales de servicio');
            const serviceAccount = require(serviceAccountPath);
            return admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: firebaseConfig.storageBucket,
                projectId: firebaseConfig.projectId
            });
        }
        else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
            // Para Vercel - usar variables de entorno
            console.log('Usando credenciales de Firebase desde variables de entorno');
            // Asegurarse de que la clave privada esté correctamente formateada
            const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
            return admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey
                }),
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
                projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId
            });
        }
        else {
            // Si no hay archivo de credenciales ni variables de entorno, inicialización mínima
            console.log('Intentando usar credenciales de entorno');
            // Para desarrollo local - esto permite probar sin credenciales completas
            return admin.initializeApp({
                projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket
            });
        }
    }
    catch (error) {
        console.error('Error al inicializar Firebase:', error);
        // Inicialización mínima para desarrollo
        return admin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId
        }, 'valnet-dev-minimal');
    }
};
// Inicializa Firebase
try {
    firebaseApp = initializeFirebase();
    console.log('Firebase inicializado correctamente');
}
catch (error) {
    console.error('Error grave al inicializar Firebase:', error);
    // Crea una app mock para que la aplicación no falle completamente en desarrollo
    firebaseApp = admin.initializeApp({
        projectId: 'mock-project-id'
    }, 'mock-app');
    console.warn('Firebase inicializado en modo MOCK. La funcionalidad será limitada.');
}
// Exportamos las referencias a los servicios de Firebase
exports.db = firebaseApp.firestore();
exports.auth = firebaseApp.auth();
exports.storage = firebaseApp.storage();
exports.default = firebaseApp;
//# sourceMappingURL=firebase.js.map
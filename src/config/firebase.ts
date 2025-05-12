import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

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

let firebaseApp: admin.app.App;

// Función para inicializar Firebase
const initializeFirebase = () => {
  try {
    // Verifica si ya hay una app inicializada
    if (admin.apps.length > 0) {
      return admin.app();
    }

    // Verifica si existe un archivo de configuración serviceAccountKey.json
    const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      // Si existe el archivo de credenciales, lo usamos
      console.log('Usando archivo de credenciales de servicio');
      const serviceAccount = require(serviceAccountPath);
      
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: firebaseConfig.storageBucket,
        projectId: firebaseConfig.projectId
      });
    } else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
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
    } else {
      // Si no hay archivo de credenciales ni variables de entorno, inicialización mínima
      console.log('Intentando usar credenciales de entorno');
      
      // Para desarrollo local - esto permite probar sin credenciales completas
      return admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket
      });
    }
  } catch (error) {
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
} catch (error) {
  console.error('Error grave al inicializar Firebase:', error);
  // Crea una app mock para que la aplicación no falle completamente en desarrollo
  firebaseApp = admin.initializeApp({
    projectId: 'mock-project-id'
  }, 'mock-app');
  console.warn('Firebase inicializado en modo MOCK. La funcionalidad será limitada.');
}

// Exportamos las referencias a los servicios de Firebase
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();

export default firebaseApp; 
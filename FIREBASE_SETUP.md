# Configuración de Firebase para el Servidor Valnet

Este servidor actúa como intermediario entre MikroWisp y las aplicaciones web de la compañía, almacenando datos extendidos en Firebase.

## Configuración de Firebase Admin SDK

Para utilizar correctamente Firebase Admin SDK, sigue estos pasos:

### 1. Obtener el archivo de credenciales de la cuenta de servicio

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/project/valnet-86e94)
2. Navega a "Configuración del proyecto" > "Cuentas de servicio"
3. Haz clic en "Generar nueva clave privada"
4. Descarga el archivo JSON de credenciales

### 2. Colocar el archivo de credenciales en el proyecto

1. Renombra el archivo descargado a `serviceAccountKey.json`
2. Colócalo en la raíz del proyecto (mismo nivel que package.json)

### 3. Configurar variables de entorno

Asegúrate de que el archivo `.env` en la raíz del proyecto contenga las siguientes variables:

```
PORT=3000
NODE_ENV=development
MIKROWISP_TOKEN=dEFDMWVjNFIyRXF0UFpCS0thTThtUT09
FIREBASE_PROJECT_ID=valnet-86e94
FIREBASE_STORAGE_BUCKET=valnet-86e94.appspot.com
```

## Notas importantes sobre seguridad

- **NUNCA** subas el archivo `serviceAccountKey.json` a un repositorio Git
- Añade `serviceAccountKey.json` a tu archivo `.gitignore`
- En producción, considera usar variables de entorno para almacenar las credenciales

## Modo de desarrollo sin credenciales

Para desarrollo local, el servidor intentará funcionar incluso sin el archivo de credenciales, pero con funcionalidad limitada. Para el funcionamiento completo, siempre se recomienda configurar adecuadamente las credenciales.

## Configuración de Firebase

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDDWMNLV0V6nz5FOZ2OhIjbJVMLsSBc4lQ",
  authDomain: "valnet-86e94.firebaseapp.com",
  projectId: "valnet-86e94",
  storageBucket: "valnet-86e94.appspot.com",
  messagingSenderId: "185345301720",
  appId: "1:185345301720:web:77e69f2695a0b6c33b8bad",
  measurementId: "G-070GRVFS5Y"
};
``` 
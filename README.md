# Valnet Backend

Servidor intermediario entre MikroWisp y las aplicaciones web de Valnet. Este servidor actúa como un punto central de comunicación, gestionando datos en MikroWisp y extendiéndolos en Firebase.

## Arquitectura

El backend forma parte de un sistema distribuido con la siguiente estructura:

- **Aplicaciones Cliente**:
  - Valnet Web
  - Valnet Central
  - Valnet Mobile App

- **Backend (Este repositorio)**:
  Centraliza las operaciones con:
  - MikroWisp API
  - Firebase (Firestore/Storage)

## Características principales

- Manejo de pre-registros (clientes e instalaciones)
- Gestión de planes y servicios
- Procesamiento de clientes
- Almacenamiento de datos extendidos en Firebase
- Comunicación segura con MikroWisp API

## Requisitos

- Node.js 16+
- TypeScript 4.5+
- Firebase Admin SDK
- MikroWisp API Token

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con:
   ```
   PORT=3000
   NODE_ENV=development
   MIKROWISP_TOKEN=your_mikrowisp_token
   FIREBASE_PROJECT_ID=valnet-86e94
   FIREBASE_STORAGE_BUCKET=valnet-86e94.appspot.com
   ```

4. Configurar Firebase Admin SDK:
   Sigue las instrucciones en `FIREBASE_SETUP.md`

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/        # Configuraciones (Firebase, etc.)
│   ├── controllers/   # Controladores para cada recurso
│   ├── middleware/    # Middleware personalizados
│   ├── models/        # Modelos de datos
│   ├── routes/        # Definición de rutas API
│   ├── services/      # Servicios (Firebase, MikroWisp)
│   ├── app.ts         # Configuración de Express
│   └── server.ts      # Punto de entrada
├── .env               # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## Uso

### Desarrollo

```bash
npm run dev
```

El servidor se iniciará en modo desarrollo con recarga automática.

### Producción

```bash
npm run build
npm start
```

## API Endpoints

### Pre-Registros

- `POST /api/pre-registro` - Crear un nuevo pre-registro
- `GET /api/pre-registro` - Obtener todos los pre-registros
- `GET /api/pre-registro/:id` - Obtener un pre-registro por ID
- `PUT /api/pre-registro/:id` - Actualizar un pre-registro
- `DELETE /api/pre-registro/:id` - Eliminar un pre-registro

### Clientes

- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/clientes/:id` - Obtener un cliente por ID
- `POST /api/clientes` - Crear un nuevo cliente
- `PUT /api/clientes/:id` - Actualizar un cliente
- `DELETE /api/clientes/:id` - Eliminar un cliente

### Planes

- `GET /api/planes` - Obtener todos los planes
- `GET /api/planes/:id` - Obtener un plan por ID
- `POST /api/planes` - Crear un nuevo plan
- `PUT /api/planes/:id` - Actualizar un plan
- `DELETE /api/planes/:id` - Eliminar un plan

## Licencia

[Especifica la licencia aquí] # valnet-backend

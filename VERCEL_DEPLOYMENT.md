# Despliegue en Vercel

Esta guía explica cómo desplegar el backend de Valnet en Vercel.

## Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com)
2. Proyecto configurado en GitHub, GitLab o Bitbucket
3. [Vercel CLI](https://vercel.com/docs/cli) (opcional)

## Configuración de Variables de Entorno

Antes de desplegar, configura las siguientes variables de entorno en Vercel:

### Variables Requeridas

- `MIKROWISP_API_URL`: URL de la API de MikroWisp (ej: http://38.57.232.66:3031)
- `MIKROWISP_TOKEN`: Token de autenticación para la API de MikroWisp

### Variables para Firebase

- `FIREBASE_PROJECT_ID`: ID del proyecto de Firebase
- `FIREBASE_CLIENT_EMAIL`: Email del cliente de Firebase
- `FIREBASE_PRIVATE_KEY`: Clave privada de Firebase (asegúrate de incluir los saltos de línea con `\n`)
- `FIREBASE_STORAGE_BUCKET`: Bucket de almacenamiento de Firebase (opcional)

## Pasos para Desplegar

### Método 1: Despliegue desde la Interfaz Web de Vercel

1. Inicia sesión en [Vercel](https://vercel.com)
2. Haz clic en "New Project"
3. Importa el repositorio desde GitHub, GitLab o Bitbucket
4. Configura el proyecto:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: npm run build
   - **Output Directory**: dist
5. Configura las variables de entorno mencionadas anteriormente
6. Haz clic en "Deploy"

### Método 2: Despliegue con Vercel CLI

1. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Inicia sesión en Vercel:
   ```bash
   vercel login
   ```

3. Configura las variables de entorno:
   ```bash
   vercel env add MIKROWISP_API_URL
   vercel env add MIKROWISP_TOKEN
   vercel env add FIREBASE_PROJECT_ID
   vercel env add FIREBASE_CLIENT_EMAIL
   vercel env add FIREBASE_PRIVATE_KEY
   ```

4. Despliega el proyecto:
   ```bash
   vercel
   ```

## Verificación del Despliegue

1. Una vez desplegado, Vercel proporcionará una URL para acceder a tu API
2. Verifica que la API funcione correctamente accediendo a la ruta `/health`
3. Si hay problemas, revisa los logs en el panel de Vercel

## Solución de Problemas Comunes

### Error de Conexión con Firebase

Si encuentras errores relacionados con Firebase, asegúrate de que:
- Las variables de entorno están correctamente configuradas
- La clave privada incluye los saltos de línea (`\n`)

### Error de Conexión con MikroWisp

Si hay problemas al conectar con MikroWisp:
- Verifica que la URL de la API sea accesible desde Vercel
- Confirma que el token es válido
- Considera configurar un proxy si la API tiene restricciones de IP 
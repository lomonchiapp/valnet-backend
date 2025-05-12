import axios from 'axios';
import { PreRegistroMikrowisp } from 'shared-types';
import { AppError } from '../../middleware/errorHandler';

// URL base de la API de MikroWisp
const MIKROWISP_API_URL = process.env.MIKROWISP_API_URL || 'http://38.57.232.66:3031';
// Token de acceso a la API
const MIKROWISP_TOKEN = process.env.MIKROWISP_TOKEN || '';

// Opciones por defecto para las peticiones
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
  maxContentLength: 50 * 1024 * 1024, // 50MB
  maxBodyLength: 50 * 1024 * 1024 // 50MB
};

/**
 * Cliente HTTP para comunicarse con la API de MikroWisp
 */
export const mikroWispClient = axios.create({
  baseURL: MIKROWISP_API_URL,
  ...defaultOptions
});

// Interceptor para manejar errores de red o problemas de conexión
mikroWispClient.interceptors.response.use(
  response => response,
  error => {
    // Personalizar el manejo de errores para Vercel
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('Error de conexión con MikroWisp API:', error.message);
      return Promise.reject(new Error(`No se pudo conectar a MikroWisp API: ${error.message}`));
    }
    return Promise.reject(error);
  }
);

/**
 * Envía datos de pre-registro a MikroWisp
 */
export const enviarPreRegistro = async (datos: PreRegistroMikrowisp): Promise<any> => {
  try {
    // Asegurarse de que el token esté presente
    if (!datos.token) {
      datos.token = MIKROWISP_TOKEN;
      
      if (!datos.token) {
        throw new AppError('Token de MikroWisp no configurado', 500);
      }
    }
    
    // Enviar solicitud a MikroWisp
    const response = await mikroWispClient.post('/pre-registro', datos);
    
    // Validar la respuesta
    if (!response.data || response.status >= 400) {
      throw new AppError(
        `Error en la respuesta de MikroWisp: ${response.data?.mensaje || 'Sin mensaje'}`,
        response.status
      );
    }
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    // Manejar errores de red o del servidor
    if (axios.isAxiosError(error)) {
      // Error de red o de la API
      const statusCode = error.response?.status || 500;
      const mensaje = error.response?.data?.mensaje || error.message;
      
      throw new AppError(`Error al comunicarse con MikroWisp: ${mensaje}`, statusCode);
    }
    
    // Relanzar otros errores
    throw error;
  }
};

/**
 * Obtiene datos de clientes desde MikroWisp
 */
export const obtenerClientes = async (): Promise<any> => {
  try {
    if (!MIKROWISP_TOKEN) {
      throw new AppError('Token de MikroWisp no configurado', 500);
    }
    
    const response = await mikroWispClient.get('/clientes', {
      params: { token: MIKROWISP_TOKEN }
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const mensaje = error.response?.data?.mensaje || error.message;
      
      throw new AppError(`Error al obtener clientes de MikroWisp: ${mensaje}`, statusCode);
    }
    
    throw error;
  }
};

/**
 * Obtiene datos de planes desde MikroWisp
 */
export const obtenerPlanes = async (): Promise<any> => {
  try {
    if (!MIKROWISP_TOKEN) {
      throw new AppError('Token de MikroWisp no configurado', 500);
    }
    
    const response = await mikroWispClient.get('/planes', {
      params: { token: MIKROWISP_TOKEN }
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const mensaje = error.response?.data?.mensaje || error.message;
      
      throw new AppError(`Error al obtener planes de MikroWisp: ${mensaje}`, statusCode);
    }
    
    throw error;
  }
};

/**
 * Interfaz para los datos de factura de MikroWisp
 * Esta es una copia de la interfaz en shared-types para evitar problemas en tiempo de ejecución
 */
export interface FacturaMikrowispLocal {
    id: string;
    legal: number;
    idcliente: string;
    emitido: string;
    vencimiento: string;
    total: number;
    estado: string;
    cobrado: number;
    impuesto: number;
    barcode_cobro_digital: string;
    fechapago: string;
    subtotal: number;
    subtotal2: number;
    total2: number;
    impuesto2: number;
    formapago: string;
}

/**
 * Parámetros para la consulta de facturas
 */
interface FacturasParams {
  page?: number;
  limit?: number;
  cliente?: string;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  token?: string;
  idcliente?: string;
  fechapago?: string;
  formapago?: string;
}

/**
 * Obtiene lista de facturas desde MikroWisp
 */
export const obtenerFacturas = async (params: FacturasParams = {}): Promise<{success: boolean, data: FacturaMikrowispLocal[] | any}> => {
  try {
    // Usar el token proporcionado en la solicitud o el token de las variables de entorno
    const { token, ...restParams } = params;
    
    const requestBody: any = { 
      token: token || MIKROWISP_TOKEN,
      ...restParams
    };
    
    // Eliminar parámetros undefined
    Object.keys(requestBody).forEach(key => 
      requestBody[key] === undefined && delete requestBody[key]
    );
    
    console.log('Enviando parámetros a MikroWisp:', requestBody);
    
    // Usar la ruta correcta para facturas y enviar los parámetros en el cuerpo
    const response = await mikroWispClient.post('/api/v1/GetInvoices', requestBody);
    
    console.log('Respuesta de MikroWisp:', response.data);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const mensaje = error.response?.data?.mensaje || error.message;
      
      throw new AppError(`Error al obtener facturas de MikroWisp: ${mensaje}`, statusCode);
    }
    
    throw error;
  }
};

/**
 * Interfaz para los datos de un nuevo ticket
 */
export interface NuevoTicket {
  token?: string;
  idcliente: number;
  asunto: string;
  contenido: string;
  dp?: number;
  prioridad?: number;
  fechavisita: string;
  turno: string;
  agendado: string;
  solicitante?: string;
  adjunto?: {
    nombre?: string;
    file?: string;
  };
}

/**
 * Crea un nuevo ticket en MikroWisp
 */
export const crearTicket = async (datos: NuevoTicket): Promise<any> => {
  try {
    if (!MIKROWISP_TOKEN && !datos.token) {
      throw new AppError('Token de MikroWisp no configurado', 500);
    }

    // Estructura exacta según la documentación de la API
    const requestBody: Record<string, any> = {
      token: datos.token || MIKROWISP_TOKEN,
      idcliente: Number(datos.idcliente),
      dp: Number(datos.dp || 1),
      asunto: datos.asunto,
      contenido: datos.contenido,
      fechavisita: datos.fechavisita,
      turno: datos.turno,
      agendado: datos.agendado
    };

    // Agregar campos opcionales si están presentes
    if (datos.solicitante) {
      requestBody.solicitante = datos.solicitante;
    }
    
    if (datos.prioridad) {
      requestBody.prioridad = Number(datos.prioridad);
    }
    
    // Si hay adjunto, agregarlo al cuerpo de la solicitud
    if (datos.adjunto && datos.adjunto.nombre && datos.adjunto.file) {
      requestBody.adjunto = {
        nombre: datos.adjunto.nombre,
        file: datos.adjunto.file
      };
    }
    
    console.log('Enviando datos de ticket a MikroWisp:', JSON.stringify(requestBody, null, 2));
    
    const response = await axios({
      method: 'post',
      url: `${MIKROWISP_API_URL}/api/v1/NewTicket`,
      data: requestBody,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    console.log('Respuesta de MikroWisp:', response.data);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('Error completo:', error);
    
    let statusCode = 500;
    let mensaje = error.message || 'Error desconocido';
    
    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      mensaje = error.response?.data?.mensaje || error.message;
      
      console.error('Error de API MikroWisp:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
    
    throw new AppError(`Error al crear ticket en MikroWisp: ${mensaje}`, statusCode);
  }
}; 
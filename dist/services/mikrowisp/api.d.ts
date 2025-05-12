import { PreRegistroMikrowisp } from 'shared-types';
/**
 * Cliente HTTP para comunicarse con la API de MikroWisp
 */
export declare const mikroWispClient: import("axios").AxiosInstance;
/**
 * Envía datos de pre-registro a MikroWisp
 */
export declare const enviarPreRegistro: (datos: PreRegistroMikrowisp) => Promise<any>;
/**
 * Obtiene datos de clientes desde MikroWisp
 */
export declare const obtenerClientes: () => Promise<any>;
/**
 * Obtiene datos de planes desde MikroWisp
 */
export declare const obtenerPlanes: () => Promise<any>;
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
export declare const obtenerFacturas: (params?: FacturasParams) => Promise<{
    success: boolean;
    data: FacturaMikrowispLocal[] | any;
}>;
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
export declare const crearTicket: (datos: NuevoTicket) => Promise<any>;
export {};

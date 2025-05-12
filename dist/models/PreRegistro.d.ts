import { PreRegistro } from 'shared-types';
export interface PreRegistroLocal {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    coordenadas: string | null;
    tipo_instalacion: string;
    referido_por: string | null;
    estado: 'pendiente' | 'procesado' | 'rechazado';
    fecha_creacion: string;
}
export declare const preRegistros: PreRegistro[];
export declare const obtenerPreRegistros: () => PreRegistro[];
export declare const obtenerPreRegistroPorId: (id: string) => PreRegistro | undefined;
export declare const crearPreRegistro: (datos: Omit<PreRegistro, "id">) => PreRegistro;
export declare const actualizarPreRegistro: (id: string, datos: Partial<PreRegistro>) => PreRegistro | null;
export declare const eliminarPreRegistro: (id: string) => boolean;

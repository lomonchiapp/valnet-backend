import { PreRegistro } from 'shared-types';
/**
 * Guarda un pre-registro en Firebase
 */
export declare const guardarPreRegistro: (preRegistro: PreRegistro) => Promise<PreRegistro>;
/**
 * Obtiene todos los pre-registros de Firebase
 */
export declare const obtenerPreRegistros: () => Promise<PreRegistro[]>;
/**
 * Obtiene un pre-registro por su ID
 */
export declare const obtenerPreRegistroPorId: (id: string) => Promise<PreRegistro | null>;
/**
 * Actualiza un pre-registro existente
 */
export declare const actualizarPreRegistro: (id: string, datos: Partial<PreRegistro>) => Promise<PreRegistro | null>;
/**
 * Elimina un pre-registro
 */
export declare const eliminarPreRegistro: (id: string) => Promise<boolean>;

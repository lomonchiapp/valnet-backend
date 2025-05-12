import { PreRegistro } from 'shared-types';

// Estructura base para nuestros pre-registros
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

// Simulación de base de datos
export const preRegistros: PreRegistro[] = [];

// Funciones CRUD
export const obtenerPreRegistros = (): PreRegistro[] => {
  return preRegistros;
};

export const obtenerPreRegistroPorId = (id: string): PreRegistro | undefined => {
  return preRegistros.find(preRegistro => preRegistro.id === id);
};

export const crearPreRegistro = (datos: Omit<PreRegistro, 'id'>): PreRegistro => {
  const id = Date.now().toString();
  
  const nuevoPreRegistro: PreRegistro = {
    ...datos,
    id
  };
  
  preRegistros.push(nuevoPreRegistro);
  return nuevoPreRegistro;
};

export const actualizarPreRegistro = (id: string, datos: Partial<PreRegistro>): PreRegistro | null => {
  const index = preRegistros.findIndex(preRegistro => preRegistro.id === id);
  
  if (index === -1) return null;
  
  const ahora = new Date();
  
  preRegistros[index] = {
    ...preRegistros[index],
    ...datos,
    updatedAt: ahora
  };
  
  return preRegistros[index];
};

export const eliminarPreRegistro = (id: string): boolean => {
  const index = preRegistros.findIndex(preRegistro => preRegistro.id === id);
  
  if (index === -1) return false;
  
  preRegistros.splice(index, 1);
  return true;
}; 
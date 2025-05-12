export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ip: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaRegistro: Date;
  planId: string;
}

// Simulación de base de datos
export const clientes: Cliente[] = [];

// Funciones CRUD
export const obtenerClientes = (): Cliente[] => {
  return clientes;
};

export const obtenerClientePorId = (id: string): Cliente | undefined => {
  return clientes.find(cliente => cliente.id === id);
};

export const crearCliente = (cliente: Omit<Cliente, 'id' | 'fechaRegistro'>): Cliente => {
  const nuevoCliente: Cliente = {
    ...cliente,
    id: Date.now().toString(),
    fechaRegistro: new Date()
  };
  
  clientes.push(nuevoCliente);
  return nuevoCliente;
};

export const actualizarCliente = (id: string, datosCliente: Partial<Cliente>): Cliente | null => {
  const index = clientes.findIndex(cliente => cliente.id === id);
  
  if (index === -1) return null;
  
  clientes[index] = {
    ...clientes[index],
    ...datosCliente
  };
  
  return clientes[index];
};

export const eliminarCliente = (id: string): boolean => {
  const index = clientes.findIndex(cliente => cliente.id === id);
  
  if (index === -1) return false;
  
  clientes.splice(index, 1);
  return true;
}; 
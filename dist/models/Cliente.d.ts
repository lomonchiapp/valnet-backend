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
export declare const clientes: Cliente[];
export declare const obtenerClientes: () => Cliente[];
export declare const obtenerClientePorId: (id: string) => Cliente | undefined;
export declare const crearCliente: (cliente: Omit<Cliente, "id" | "fechaRegistro">) => Cliente;
export declare const actualizarCliente: (id: string, datosCliente: Partial<Cliente>) => Cliente | null;
export declare const eliminarCliente: (id: string) => boolean;

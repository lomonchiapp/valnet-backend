import { PreRegistro } from 'shared-types';
import { db } from '../config/firebase';

const COLLECTION = 'preRegistros';

/**
 * Guarda un pre-registro en Firebase
 */
export const guardarPreRegistro = async (preRegistro: PreRegistro): Promise<PreRegistro> => {
  try {
    // Crear o actualizar el documento en Firestore
    const preRegistroRef = preRegistro.id 
      ? db.collection(COLLECTION).doc(preRegistro.id)
      : db.collection(COLLECTION).doc();
    
    // Si no tiene ID (es nuevo), asignamos el ID de Firestore
    if (!preRegistro.id) {
      preRegistro.id = preRegistroRef.id;
    }
    
    // Guardar en Firestore
    await preRegistroRef.set(preRegistro, { merge: true });
    
    return preRegistro;
  } catch (error) {
    console.error('Error al guardar pre-registro en Firebase:', error);
    throw error;
  }
};

/**
 * Obtiene todos los pre-registros de Firebase
 */
export const obtenerPreRegistros = async (): Promise<PreRegistro[]> => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map(doc => doc.data() as PreRegistro);
  } catch (error) {
    console.error('Error al obtener pre-registros de Firebase:', error);
    throw error;
  }
};

/**
 * Obtiene un pre-registro por su ID
 */
export const obtenerPreRegistroPorId = async (id: string): Promise<PreRegistro | null> => {
  try {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return doc.data() as PreRegistro;
  } catch (error) {
    console.error(`Error al obtener pre-registro con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Actualiza un pre-registro existente
 */
export const actualizarPreRegistro = async (id: string, datos: Partial<PreRegistro>): Promise<PreRegistro | null> => {
  try {
    const preRegistroRef = db.collection(COLLECTION).doc(id);
    const doc = await preRegistroRef.get();
    
    if (!doc.exists) return null;
    
    // Añadir timestamp de actualización
    const datosActualizados = {
      ...datos,
      updatedAt: new Date()
    };
    
    await preRegistroRef.update(datosActualizados);
    
    // Obtener el documento actualizado
    const docActualizado = await preRegistroRef.get();
    return docActualizado.data() as PreRegistro;
  } catch (error) {
    console.error(`Error al actualizar pre-registro con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un pre-registro
 */
export const eliminarPreRegistro = async (id: string): Promise<boolean> => {
  try {
    const preRegistroRef = db.collection(COLLECTION).doc(id);
    const doc = await preRegistroRef.get();
    
    if (!doc.exists) return false;
    
    await preRegistroRef.delete();
    return true;
  } catch (error) {
    console.error(`Error al eliminar pre-registro con ID ${id}:`, error);
    throw error;
  }
}; 
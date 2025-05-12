"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPreRegistro = exports.actualizarPreRegistro = exports.obtenerPreRegistroPorId = exports.obtenerPreRegistros = exports.guardarPreRegistro = void 0;
const firebase_1 = require("../config/firebase");
const COLLECTION = 'preRegistros';
/**
 * Guarda un pre-registro en Firebase
 */
const guardarPreRegistro = async (preRegistro) => {
    try {
        // Crear o actualizar el documento en Firestore
        const preRegistroRef = preRegistro.id
            ? firebase_1.db.collection(COLLECTION).doc(preRegistro.id)
            : firebase_1.db.collection(COLLECTION).doc();
        // Si no tiene ID (es nuevo), asignamos el ID de Firestore
        if (!preRegistro.id) {
            preRegistro.id = preRegistroRef.id;
        }
        // Guardar en Firestore
        await preRegistroRef.set(preRegistro, { merge: true });
        return preRegistro;
    }
    catch (error) {
        console.error('Error al guardar pre-registro en Firebase:', error);
        throw error;
    }
};
exports.guardarPreRegistro = guardarPreRegistro;
/**
 * Obtiene todos los pre-registros de Firebase
 */
const obtenerPreRegistros = async () => {
    try {
        const snapshot = await firebase_1.db.collection(COLLECTION).get();
        return snapshot.docs.map(doc => doc.data());
    }
    catch (error) {
        console.error('Error al obtener pre-registros de Firebase:', error);
        throw error;
    }
};
exports.obtenerPreRegistros = obtenerPreRegistros;
/**
 * Obtiene un pre-registro por su ID
 */
const obtenerPreRegistroPorId = async (id) => {
    try {
        const doc = await firebase_1.db.collection(COLLECTION).doc(id).get();
        if (!doc.exists)
            return null;
        return doc.data();
    }
    catch (error) {
        console.error(`Error al obtener pre-registro con ID ${id}:`, error);
        throw error;
    }
};
exports.obtenerPreRegistroPorId = obtenerPreRegistroPorId;
/**
 * Actualiza un pre-registro existente
 */
const actualizarPreRegistro = async (id, datos) => {
    try {
        const preRegistroRef = firebase_1.db.collection(COLLECTION).doc(id);
        const doc = await preRegistroRef.get();
        if (!doc.exists)
            return null;
        // Añadir timestamp de actualización
        const datosActualizados = {
            ...datos,
            updatedAt: new Date()
        };
        await preRegistroRef.update(datosActualizados);
        // Obtener el documento actualizado
        const docActualizado = await preRegistroRef.get();
        return docActualizado.data();
    }
    catch (error) {
        console.error(`Error al actualizar pre-registro con ID ${id}:`, error);
        throw error;
    }
};
exports.actualizarPreRegistro = actualizarPreRegistro;
/**
 * Elimina un pre-registro
 */
const eliminarPreRegistro = async (id) => {
    try {
        const preRegistroRef = firebase_1.db.collection(COLLECTION).doc(id);
        const doc = await preRegistroRef.get();
        if (!doc.exists)
            return false;
        await preRegistroRef.delete();
        return true;
    }
    catch (error) {
        console.error(`Error al eliminar pre-registro con ID ${id}:`, error);
        throw error;
    }
};
exports.eliminarPreRegistro = eliminarPreRegistro;
//# sourceMappingURL=FirebasePreRegistro.js.map
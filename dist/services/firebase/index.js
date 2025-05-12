"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = exports.FirestoreService = void 0;
const firebase_1 = require("../../config/firebase");
const errorHandler_1 = require("../../middleware/errorHandler");
/**
 * Servicio para interactuar con Firestore
 */
class FirestoreService {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    /**
     * Obtiene la referencia a la colección
     */
    getCollection() {
        return firebase_1.db.collection(this.collectionName);
    }
    /**
     * Guarda un documento en Firestore
     */
    async create(data) {
        try {
            const docRef = data.id
                ? this.getCollection().doc(data.id)
                : this.getCollection().doc();
            // Si no tiene ID, asignamos el ID generado por Firestore
            if (!data.id) {
                data.id = docRef.id;
            }
            // Guardar en Firestore con timestamps
            await docRef.set({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return data;
        }
        catch (error) {
            console.error(`Error al crear documento en ${this.collectionName}:`, error);
            throw new errorHandler_1.AppError(`Error al guardar datos en Firestore: ${error.message}`, 500);
        }
    }
    /**
     * Actualiza un documento existente
     */
    async update(id, data) {
        try {
            const docRef = this.getCollection().doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new errorHandler_1.AppError(`Documento con ID ${id} no encontrado`, 404);
            }
            const updatedData = {
                ...data,
                updatedAt: new Date()
            };
            await docRef.update(updatedData);
            // Obtener el documento actualizado
            const updatedDoc = await docRef.get();
            return updatedDoc.data();
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            console.error(`Error al actualizar documento en ${this.collectionName}:`, error);
            throw new errorHandler_1.AppError(`Error al actualizar datos en Firestore: ${error.message}`, 500);
        }
    }
    /**
     * Obtiene todos los documentos de la colección
     */
    async getAll() {
        try {
            const snapshot = await this.getCollection().get();
            return snapshot.docs.map(doc => doc.data());
        }
        catch (error) {
            console.error(`Error al obtener documentos de ${this.collectionName}:`, error);
            throw new errorHandler_1.AppError(`Error al obtener datos de Firestore: ${error.message}`, 500);
        }
    }
    /**
     * Obtiene un documento por su ID
     */
    async getById(id) {
        try {
            const doc = await this.getCollection().doc(id).get();
            if (!doc.exists) {
                return null;
            }
            return doc.data();
        }
        catch (error) {
            console.error(`Error al obtener documento ${id} de ${this.collectionName}:`, error);
            throw new errorHandler_1.AppError(`Error al obtener datos de Firestore: ${error.message}`, 500);
        }
    }
    /**
     * Elimina un documento
     */
    async delete(id) {
        try {
            const docRef = this.getCollection().doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                return false;
            }
            await docRef.delete();
            return true;
        }
        catch (error) {
            console.error(`Error al eliminar documento ${id} de ${this.collectionName}:`, error);
            throw new errorHandler_1.AppError(`Error al eliminar datos de Firestore: ${error.message}`, 500);
        }
    }
    /**
     * Busca documentos por un campo específico
     */
    async findBy(field, value) {
        try {
            const snapshot = await this.getCollection().where(field, '==', value).get();
            return snapshot.docs.map(doc => doc.data());
        }
        catch (error) {
            console.error(`Error al buscar documentos por ${field} en ${this.collectionName}:`, error);
            throw new errorHandler_1.AppError(`Error al buscar datos en Firestore: ${error.message}`, 500);
        }
    }
}
exports.FirestoreService = FirestoreService;
/**
 * Clase para manejar archivos en Firebase Storage
 */
class StorageService {
    constructor(bucketName) {
        this.bucketName = bucketName || '';
    }
    /**
     * Sube un archivo a Storage
     */
    async uploadFile(filePath, fileBuffer, metadata) {
        try {
            const bucket = firebase_1.storage.bucket(this.bucketName);
            const file = bucket.file(filePath);
            await file.save(fileBuffer, {
                metadata: {
                    contentType: (metadata === null || metadata === void 0 ? void 0 : metadata.contentType) || 'application/octet-stream',
                    ...metadata
                }
            });
            // Generar URL pública para el archivo
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-01-2500' // Fecha muy lejana
            });
            return url;
        }
        catch (error) {
            console.error('Error al subir archivo a Storage:', error);
            throw new errorHandler_1.AppError(`Error al subir archivo a Firebase Storage: ${error.message}`, 500);
        }
    }
    /**
     * Elimina un archivo de Storage
     */
    async deleteFile(filePath) {
        try {
            const bucket = firebase_1.storage.bucket(this.bucketName);
            const file = bucket.file(filePath);
            // Verificar si el archivo existe
            const [exists] = await file.exists();
            if (!exists) {
                return false;
            }
            await file.delete();
            return true;
        }
        catch (error) {
            console.error('Error al eliminar archivo de Storage:', error);
            throw new errorHandler_1.AppError(`Error al eliminar archivo de Firebase Storage: ${error.message}`, 500);
        }
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=index.js.map
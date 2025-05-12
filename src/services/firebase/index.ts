import { db, storage } from '../../config/firebase';
import { AppError } from '../../middleware/errorHandler';

/**
 * Servicio para interactuar con Firestore
 */
export class FirestoreService<T extends { id?: string }> {
  collectionName: string;
  
  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }
  
  /**
   * Obtiene la referencia a la colección
   */
  getCollection() {
    return db.collection(this.collectionName);
  }
  
  /**
   * Guarda un documento en Firestore
   */
  async create(data: T): Promise<T> {
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
    } catch (error: any) {
      console.error(`Error al crear documento en ${this.collectionName}:`, error);
      throw new AppError(`Error al guardar datos en Firestore: ${error.message}`, 500);
    }
  }
  
  /**
   * Actualiza un documento existente
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const docRef = this.getCollection().doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        throw new AppError(`Documento con ID ${id} no encontrado`, 404);
      }
      
      const updatedData = {
        ...data,
        updatedAt: new Date()
      };
      
      await docRef.update(updatedData);
      
      // Obtener el documento actualizado
      const updatedDoc = await docRef.get();
      return updatedDoc.data() as T;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      
      console.error(`Error al actualizar documento en ${this.collectionName}:`, error);
      throw new AppError(`Error al actualizar datos en Firestore: ${error.message}`, 500);
    }
  }
  
  /**
   * Obtiene todos los documentos de la colección
   */
  async getAll(): Promise<T[]> {
    try {
      const snapshot = await this.getCollection().get();
      return snapshot.docs.map(doc => doc.data() as T);
    } catch (error: any) {
      console.error(`Error al obtener documentos de ${this.collectionName}:`, error);
      throw new AppError(`Error al obtener datos de Firestore: ${error.message}`, 500);
    }
  }
  
  /**
   * Obtiene un documento por su ID
   */
  async getById(id: string): Promise<T | null> {
    try {
      const doc = await this.getCollection().doc(id).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return doc.data() as T;
    } catch (error: any) {
      console.error(`Error al obtener documento ${id} de ${this.collectionName}:`, error);
      throw new AppError(`Error al obtener datos de Firestore: ${error.message}`, 500);
    }
  }
  
  /**
   * Elimina un documento
   */
  async delete(id: string): Promise<boolean> {
    try {
      const docRef = this.getCollection().doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return false;
      }
      
      await docRef.delete();
      return true;
    } catch (error: any) {
      console.error(`Error al eliminar documento ${id} de ${this.collectionName}:`, error);
      throw new AppError(`Error al eliminar datos de Firestore: ${error.message}`, 500);
    }
  }
  
  /**
   * Busca documentos por un campo específico
   */
  async findBy(field: string, value: any): Promise<T[]> {
    try {
      const snapshot = await this.getCollection().where(field, '==', value).get();
      return snapshot.docs.map(doc => doc.data() as T);
    } catch (error: any) {
      console.error(`Error al buscar documentos por ${field} en ${this.collectionName}:`, error);
      throw new AppError(`Error al buscar datos en Firestore: ${error.message}`, 500);
    }
  }
}

/**
 * Clase para manejar archivos en Firebase Storage
 */
export class StorageService {
  bucketName: string;
  
  constructor(bucketName?: string) {
    this.bucketName = bucketName || '';
  }
  
  /**
   * Sube un archivo a Storage
   */
  async uploadFile(
    filePath: string, 
    fileBuffer: Buffer, 
    metadata?: { contentType?: string; [key: string]: any }
  ): Promise<string> {
    try {
      const bucket = storage.bucket(this.bucketName);
      const file = bucket.file(filePath);
      
      await file.save(fileBuffer, {
        metadata: {
          contentType: metadata?.contentType || 'application/octet-stream',
          ...metadata
        }
      });
      
      // Generar URL pública para el archivo
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500' // Fecha muy lejana
      });
      
      return url;
    } catch (error: any) {
      console.error('Error al subir archivo a Storage:', error);
      throw new AppError(`Error al subir archivo a Firebase Storage: ${error.message}`, 500);
    }
  }
  
  /**
   * Elimina un archivo de Storage
   */
  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const bucket = storage.bucket(this.bucketName);
      const file = bucket.file(filePath);
      
      // Verificar si el archivo existe
      const [exists] = await file.exists();
      
      if (!exists) {
        return false;
      }
      
      await file.delete();
      return true;
    } catch (error: any) {
      console.error('Error al eliminar archivo de Storage:', error);
      throw new AppError(`Error al eliminar archivo de Firebase Storage: ${error.message}`, 500);
    }
  }
} 
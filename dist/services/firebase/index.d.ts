/**
 * Servicio para interactuar con Firestore
 */
export declare class FirestoreService<T extends {
    id?: string;
}> {
    collectionName: string;
    constructor(collectionName: string);
    /**
     * Obtiene la referencia a la colección
     */
    getCollection(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
    /**
     * Guarda un documento en Firestore
     */
    create(data: T): Promise<T>;
    /**
     * Actualiza un documento existente
     */
    update(id: string, data: Partial<T>): Promise<T>;
    /**
     * Obtiene todos los documentos de la colección
     */
    getAll(): Promise<T[]>;
    /**
     * Obtiene un documento por su ID
     */
    getById(id: string): Promise<T | null>;
    /**
     * Elimina un documento
     */
    delete(id: string): Promise<boolean>;
    /**
     * Busca documentos por un campo específico
     */
    findBy(field: string, value: any): Promise<T[]>;
}
/**
 * Clase para manejar archivos en Firebase Storage
 */
export declare class StorageService {
    bucketName: string;
    constructor(bucketName?: string);
    /**
     * Sube un archivo a Storage
     */
    uploadFile(filePath: string, fileBuffer: Buffer, metadata?: {
        contentType?: string;
        [key: string]: any;
    }): Promise<string>;
    /**
     * Elimina un archivo de Storage
     */
    deleteFile(filePath: string): Promise<boolean>;
}

import * as admin from 'firebase-admin';
declare let firebaseApp: admin.app.App;
export declare const db: admin.firestore.Firestore;
export declare const auth: import("firebase-admin/lib/auth/auth").Auth;
export declare const storage: import("firebase-admin/lib/storage/storage").Storage;
export default firebaseApp;

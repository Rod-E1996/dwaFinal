import { db } from './config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  onSnapshot,
  QueryConstraint,
  DocumentReference,
  Query
} from 'firebase/firestore';

export const useFirestore = {
  async getCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
        // console.log(querySnapshot);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
      }));
    } catch (error) {
        console.log(error);
        throw error;
    }
  },

  // Escucha en tiempo real una colección completa
  listenCollection(collectionName: string, callback: (docs: any[]) => void) {
    try {
      const colRef = collection(db, collectionName);
      const unsub = onSnapshot(colRef, (querySnapshot) => {
        const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(data);
      }, (err) => {
        console.error('Error en listener colección:', err);
      });
      return unsub;
    } catch (error) {
      console.error('listenCollection error:', error);
      throw error;
    }
  },

  // Escucha en tiempo real una consulta (con constraints)
  listenQueryCollection(collectionName: string, callback: (docs: any[]) => void, ...queryConstraints: QueryConstraint[]) {
    try {
      const q = query(collection(db, collectionName), ...queryConstraints) as Query;
      const unsub = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(data);
      }, (err) => {
        console.error('Error en listener query:', err);
      });
      return unsub;
    } catch (error) {
      console.error('listenQueryCollection error:', error);
      throw error;
    }
  },

  async getDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Escucha en tiempo real un documento específico
  listenDocument(collectionName: string, documentId: string, callback: (doc: any | null) => void) {
    try {
      const docRef = doc(db, collectionName, documentId) as DocumentReference;
      const unsub = onSnapshot(docRef, (docSnap) => {
        callback(docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null);
      }, (err) => {
        console.error('Error en listener documento:', err);
      });
      return unsub;
    } catch (error) {
      console.error('listenDocument error:', error);
      throw error;
    }
  },

  async addDocument(collectionName: string, data: any) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async updateDocument(collectionName: string, documentId: string, data: any) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  },

  async deleteDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  async setDocumentWithId(collectionName: string, documentId: string, data: any, merge = true) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await setDoc(docRef, data, { merge });
    } catch (error) {
      throw error;
    }
  },

  async queryCollection(collectionName: string, ...queryConstraints: QueryConstraint[]) {
    try {
      const q = query(collection(db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  }
};
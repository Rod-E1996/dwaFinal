import { db } from './config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint
} from 'firebase/firestore';

export const useFirestore = {
  async getCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
        console.log(querySnapshot);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
      }));
    } catch (error) {
        console.log(error);
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
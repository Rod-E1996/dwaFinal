import { auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import type { AuthResponse, StoredAuthData } from '../composables/types';
import { useFirestore } from './firestore';

export const useAuth = {
  storeAuthData(authData: AuthResponse) {
    const expiresAt = Date.now() + (parseInt(authData.expiresIn) * 1000);
    const dataToStore: StoredAuthData = {
      idToken: authData.idToken,
      refreshToken: authData.refreshToken,
      email: authData.email,
      localId: authData.localId,
      expiresAt
    };
    localStorage.setItem('authData', JSON.stringify(dataToStore));
  },

  clearAuthData() {
    localStorage.removeItem('authData');
  },

  getStoredAuthData(): StoredAuthData | null {
    const authData = localStorage.getItem('authData');
    if (!authData) return null;
    const parsed = JSON.parse(authData) as StoredAuthData;
    
    if (Date.now() >= parsed.expiresAt) {
      this.clearAuthData();
      return null;
    }
    
    return parsed;
  },

  async refreshToken(): Promise<boolean> {
    const authData = this.getStoredAuthData();
    if (!authData?.refreshToken) return false;

    try {
      const response = await fetch('https://securetoken.googleapis.com/v1/token?key=' + import.meta.env.VITE_FIREBASE_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: authData.refreshToken
        })
      });

      const data = await response.json();
      if (data.id_token) {
        this.storeAuthData({
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
          localId: authData.localId,
          email: authData.email,
          kind: 'tokens'
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  },

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const authResponse: AuthResponse = {
        kind: 'identitytoolkit#SignupNewUserResponse',
        idToken,
        email: user.email!,
        refreshToken: user.refreshToken,
        expiresIn: '3600',
        localId: user.uid
      };
      this.storeAuthData(authResponse);
      // Guardar perfil en Firestore (colección 'users') usando uid como id
      try {
        await useFirestore.setDocumentWithId('users', user.uid, {
          uid: user.uid,
          email: user.email || null,
          displayName: (user as any).displayName || null,
          createdAt: Date.now(),
          lastLoginAt: Date.now()
        });
      } catch (e) {
        // no detener el flujo por fallo en guardar el perfil
        console.warn('No se pudo guardar el perfil en Firestore:', e);
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const authResponse: AuthResponse = {
        kind: 'identitytoolkit#VerifyPasswordResponse',
        idToken,
        email: user.email!,
        refreshToken: user.refreshToken,
        expiresIn: '3600',
        localId: user.uid,
        registered: true
      };
      this.storeAuthData(authResponse);
      // Actualizar (o crear) perfil en Firestore con fecha de último login
      try {
        await useFirestore.setDocumentWithId('users', user.uid, {
          uid: user.uid,
          email: user.email || null,
          displayName: (user as any).displayName || null,
          lastLoginAt: Date.now()
        }, true);
      } catch (e) {
        console.warn('No se pudo actualizar el perfil en Firestore:', e);
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await signOut(auth);
      this.clearAuthData();
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser(): User | null {
    const authData = this.getStoredAuthData();
    if (!authData) {
      return auth.currentUser;
    }
    
    const fiveMinutes = 5 * 60 * 1000;
    if (authData.expiresAt - Date.now() < fiveMinutes) {
      this.refreshToken();
    }
    
    return auth.currentUser;
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  async initializeAuth(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }
};
export interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    displayName?: string;
}

export interface StoredAuthData {
    idToken: string;
    refreshToken: string;
    email: string;
    localId: string;
    expiresAt: number;
}
import { ClientResponseError } from "pocketbase";
import { pb } from "@services/service.pocketbase";

interface User {
    id: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    name?: string;
    avatar?: string;
    created?: string;
    updated?: string;
}

export interface AuthResponse {
    success: boolean;
    error?: string;
    token?: string;
    record?: User;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const authService = {
    async login(payload: LoginPayload): Promise<AuthResponse> {
        try {
            const authData = await pb.collection("users").authWithPassword(payload.email, payload.password);
            return {
                success: true,
                token: authData.token,
            };
        } catch (error) {
            if (error instanceof ClientResponseError) {
                return {
                    success: false,
                    error: error.message || "Email ou mot de passe incorrect",
                };
            }
            return {
                success: false,
                error: "Une erreur inattendue est survenue",
            };
        }
    },

    async register(payload: RegisterPayload): Promise<AuthResponse> {
        try {
            const authData = await pb.collection("users").create({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                passwordConfirm: payload.passwordConfirm,
            });
            return {
                success: true,
                token: authData.token,
            };
        } catch (error) {
            if (error instanceof ClientResponseError) {
                return {
                    success: false,
                    error: error.message || "Email déjà utilisé",
                };
            }
            return {
                success: false,
                error: "Une erreur inattendue est survenue",
            };
        }
    },

    logout() {
        pb.authStore.clear();
    },

    isAuthenticated(): boolean {
        return pb.authStore.isValid;
    },

    getToken(): string | null {
        return pb.authStore.token;
    },

    getCurrentUser(): User | null {
        return pb.authStore.record as unknown as User | null;
    },
};

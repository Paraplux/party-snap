import {
    authService,
    type AuthResponse,
    type LoginPayload,
    type OAuthLoginPayload,
    type RegisterPayload,
} from "@/services/auth.pocketbase";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

const authQueryKey = ["auth"];

export const useLogin = (options?: UseMutationOptions<AuthResponse, Error, LoginPayload>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.login,
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });
};

export const useOAuthLogin = (options?: UseMutationOptions<AuthResponse, Error, OAuthLoginPayload>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.oAuthLogin,
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });
};

export const useRegister = (options?: UseMutationOptions<AuthResponse, Error, RegisterPayload>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.register,
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });
};

export const useLogout = (options?: UseMutationOptions<AuthResponse, Error, void>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.logout,
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });
};

export const useAuth = () => {
    const { data: authState = { isAuthenticated: false } } = useQuery({
        queryKey: authQueryKey,
        queryFn: () => ({
            isAuthenticated: authService.isAuthenticated(),
        }),
    });

    return {
        isAuthenticated: authState.isAuthenticated,
        currentUser: authService.getCurrentUser(),
    };
};

import { authService, type AuthResponse } from "@/services/auth.pocketbase";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

const authQueryKey = ["auth"];

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
        },
    });
};

export const useOAuthLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.oAuthLogin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
        },
    });
};

export const useLogout = (options?: UseMutationOptions<AuthResponse, Error, void>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.logout,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: authQueryKey });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        ...options,
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
        getCurrentUser: authService.getCurrentUser,
    };
};

import type { Event } from "@/features/events/hooks/useEvents";
import { appService } from "@/services/app.pocketbase";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

const baseQueryKey = "guests";

export interface Guest {
    id: string;
    name: string;
    event: Event;
    createdAt: string;
    updatedAt: string;
}

export const useGuest = (eventId: string | undefined, id: string | undefined) => {
    return useQuery({
        queryKey: [baseQueryKey, eventId, id],
        queryFn: () => {
            return appService.guests.getOne<Guest>(id ?? "");
        },
        enabled: !!id,
    });
};

type AddGuestPayload = Pick<Guest, "name"> & { event: Event["id"] };
export const useAddGuest = (options?: UseMutationOptions<Guest, Error, AddGuestPayload>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (guest: AddGuestPayload) => appService.guests.create<Guest>(guest),
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: [baseQueryKey, data.id] });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });
};

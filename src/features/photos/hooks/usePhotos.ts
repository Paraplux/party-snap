import type { Event } from "@/features/events/hooks/useEvents";
import type { Guest } from "@/features/guests/hooks/useGuests";
import { appService } from "@/services/app.pocketbase";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

interface Photo {
    id: string;
    name: string;
    file: File;
    tags?: string[];
}

interface UsePhotosParams {
    guestId?: string;
    eventId: string;
}

export const usePhotos = (params: UsePhotosParams) => {
    return useQuery({
        queryKey: ["photos", params.guestId, params.eventId],
        queryFn: () => {
            let filter = "";
            if (params?.guestId) {
                filter += `createdBy = "${params.guestId}"`;
            }
            if (params?.eventId) {
                if (filter) filter += " && ";
                filter += `event = "${params.eventId}"`;
            }
            return appService.photos.getFullList({
                filter: filter,
                requestKey: "photos-filtered",
            });
        },
        enabled: !!(params?.guestId || params?.eventId),
    });
};

export const useAllEventPhotos = (eventId: Event["id"] | undefined) => {
    return useQuery({
        queryKey: ["photos", "all", eventId],
        queryFn: () => {
            if (!eventId) {
                throw new Error("Event ID is required");
            }
            return appService.photos.getFullList({
                filter: `event = "${eventId}"`,
                requestKey: "photos-all-event",
            });
        },
        enabled: !!eventId,
    });
};

type AddPhotoPayload = {
    guestId: Guest["id"];
    eventId: Event["id"];
    photos: PhotoPayload[];
};
type PhotoPayload = Pick<Photo, "name" | "tags"> & { file: File };
export const useAddPhotos = (options?: UseMutationOptions<void, Error, AddPhotoPayload>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: AddPhotoPayload) => {
            for (const photo of params.photos) {
                await appService.photos.create({
                    ...photo,
                    createdBy: params.guestId,
                    event: params.eventId,
                });
            }
        },
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["photos"] });
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });
};

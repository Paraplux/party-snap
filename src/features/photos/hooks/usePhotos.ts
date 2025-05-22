import { useAuth } from "@/features/auth/hooks/useAuth";
import { appService } from "@/services/app.pocketbase";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

interface Photo {
    id: string;
    name: string;
    file: File;
    tags?: string[];
}

interface UsePhotosParams {
    userId?: string;
    eventId: string;
}

export const usePhotos = (params: UsePhotosParams) => {
    return useQuery({
        queryKey: ["photos", params.userId, params.eventId],
        queryFn: () => {
            let filter = "";
            if (params?.userId) {
                filter += `createdBy = "${params.userId}"`;
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
        enabled: !!(params?.userId || params?.eventId),
    });
};

export const useAllPhotos = () => {
    return useQuery({
        queryKey: ["photos", "all", "all"],
        queryFn: () => {
            return appService.photos.getFullList({
                requestKey: "photos-all",
            });
        },
    });
};

type AddPhotoPayload = Pick<Photo, "name" | "tags"> & { file: File };
export const useAddPhotos = (options?: UseMutationOptions<void, Error, AddPhotoPayload[]>) => {
    const queryClient = useQueryClient();
    const { getCurrentUser } = useAuth();
    const user = getCurrentUser();
    return useMutation({
        mutationFn: async (photos: AddPhotoPayload[]) => {
            if (!user) {
                throw new Error("User not found");
            }
            for (const photo of photos) {
                await appService.photos.create({
                    ...photo,
                    createdBy: user.id,
                    event: "652eo4n4309frgu",
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

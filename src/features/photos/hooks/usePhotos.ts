import { appService } from "@/services/app.pocketbase";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

interface Photo {
    id: string;
    name: string;
    file: File;
    tags?: string[];
}

export const usePhotos = () => {
    return useQuery({
        queryKey: ["photos"],
        queryFn: () => appService.photos.getFullList(),
    });
};

type AddPhotoPayload = Pick<Photo, "name" | "tags"> & { file: File };
export const useAddPhotos = (options?: UseMutationOptions<void, Error, AddPhotoPayload[]>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (photos: AddPhotoPayload[]) => {
            for (const photo of photos) {
                await appService.photos.create(photo);
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

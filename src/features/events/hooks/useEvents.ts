import { useQuery } from "@tanstack/react-query";
import { appService } from "@/services/app.pocketbase";

export interface Event {
    id: string;
    name: string;
    start: string;
    end: string;
    tags: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export const useEvent = (eventId: string | undefined) => {
    return useQuery({
        queryKey: ["events", eventId],
        queryFn: () => {
            if (!eventId) {
                throw new Error("Event ID is required");
            }
            return appService.events.getOne<Event>(eventId);
        },
        enabled: !!eventId,
    });
};

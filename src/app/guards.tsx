import { useEvent } from "@/features/events/hooks/useEvents";
import { EventNotFound } from "@/pages/events/NotFound";
import { useCookies } from "react-cookie";
import { Navigate, useParams } from "react-router";
import { Loader, Center } from "@mantine/core";

export const EventsGuard = ({ children }: { children: React.ReactNode }) => {
    const { eventId } = useParams<{ eventId: string }>();

    const { data: event, isLoading } = useEvent(eventId ?? "");

    if (isLoading) {
        return (
            <Center h="100vh">
                <Loader />
            </Center>
        );
    }

    if (!event) {
        return <EventNotFound />;
    }

    return children;
};

export const GuestsCookieGuard = ({ children }: { children: React.ReactNode }) => {
    const { eventId } = useParams<{ eventId: string }>();
    const [cookies] = useCookies([`guest_id_${eventId}`]);

    if (!cookies[`guest_id_${eventId}`]) {
        console.log("no cookie");
        return <Navigate to={`/events/${eventId}/guests/create`} replace />;
    }

    return children;
};

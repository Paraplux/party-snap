import { useEvent } from "@/features/events/hooks/useEvents";
import { Navigate, useParams } from "react-router";
import { EventNotFound } from "./NotFound";
import { useCookies } from "react-cookie";
import { useGuest } from "@/features/guests/hooks/useGuests";
import { EventHeader } from "./components/EventHeader";
import { Box, Loader, Space } from "@mantine/core";
import { Center } from "@mantine/core";
import EventMansory from "./components/EventMansory";
import EventAddPhoto from "./components/EventAddPhoto";

export const Event = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [cookies] = useCookies([`guest_id_${eventId}`]);

    const { data: guest, isLoading: isGuestLoading } = useGuest(eventId, cookies[`guest_id_${eventId}`]);
    const { data: event, isLoading: isEventLoading } = useEvent(eventId);

    if (isGuestLoading || isEventLoading) {
        return (
            <Center h="100vh">
                <Loader />
            </Center>
        );
    }

    if (!guest) {
        return <Navigate to={`/events/${eventId}/guests/create`} replace />;
    }

    if (!event) {
        return <EventNotFound />;
    }

    return (
        <Box>
            <EventHeader event={event} />
            <Space h="md" />
            <EventMansory event={event} />
            <EventAddPhoto guest={guest} event={event} />
        </Box>
    );
};

import { type Event } from "@/features/events/hooks/useEvents";
import { Box, Center, Image, Stack, Text } from "@mantine/core";
import tmpEventHeader from "./tmp-event-header.jpeg";

interface EventHeaderProps {
    event: Event;
}

export const EventHeader = ({ event }: EventHeaderProps) => {
    return (
        <Box pos="relative">
            <Image src={tmpEventHeader} alt={event.name} height={180} />
            <Center
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <Stack align="center" justify="center" gap={0}>
                    <Text c="white" size="xl" fw={700}>
                        {event.name}
                    </Text>
                    <Text c="white" size="sm">
                        {new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}
                    </Text>
                </Stack>
            </Center>
        </Box>
    );
};

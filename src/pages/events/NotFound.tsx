import { Container, Title, Text, Stack, Center } from "@mantine/core";
import { IconCalendarOff } from "@tabler/icons-react";

export function EventNotFound() {
    return (
        <Container size="sm" py="xl">
            <Center>
                <Stack align="center" gap="lg">
                    <IconCalendarOff size={64} color="var(--mantine-color-gray-6)" />

                    <Title order={1} ta="center" c="dimmed">
                        Événement non trouvé
                    </Title>

                    <Text c="dimmed" ta="center" size="lg">
                        Désolé, cet événement n'existe pas ou est déjà terminé.
                    </Text>
                </Stack>
            </Center>
        </Container>
    );
}

export default EventNotFound;

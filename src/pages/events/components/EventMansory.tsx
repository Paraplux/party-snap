import { Text } from "@mantine/core";

import type { Event } from "@/features/events/hooks/useEvents";
import { useAllEventPhotos } from "@/features/photos/hooks/usePhotos";
import Masonry from "react-responsive-masonry";
import { Box, Image } from "@mantine/core";
import { ResponsiveMasonry } from "react-responsive-masonry";
import { config } from "@/app/config";

interface EventMansoryProps {
    event: Event;
}
export default function EventMansory({ event }: EventMansoryProps) {
    const { data: photos, isLoading } = useAllEventPhotos(event.id);

    if (isLoading) {
        return <></>;
    }

    if (!photos) {
        return <></>;
    }
    return (
        <>
            {photos.length > 0 ? (
                <Box p="xs">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 750: 3, 900: 4 }}>
                        <Masonry>
                            {photos?.map((photo) => (
                                <Image
                                    key={photo.id}
                                    src={`${config.pocketbase.photosUrl}/${photo.id}/${photo.file}`}
                                    alt="Photo"
                                />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </Box>
            ) : (
                <Box p="md">
                    <Text ta="center" size="sm" c="dimmed">
                        Aucune photo trouvée. Ajoutez des photos pour commencer.
                    </Text>
                </Box>
            )}
        </>
    );
}

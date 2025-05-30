import { ActionIcon, Overlay, Text } from "@mantine/core";

import type { Event } from "@/features/events/hooks/useEvents";
import { useAllEventPhotos } from "@/features/photos/hooks/usePhotos";
import Masonry from "react-responsive-masonry";
import { Box, Image } from "@mantine/core";
import { ResponsiveMasonry } from "react-responsive-masonry";
import { config } from "@/app/config";
import { useState } from "react";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";

interface EventMansoryProps {
    event: Event;
}
export default function EventMansory({ event }: EventMansoryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { data: photos, isLoading } = useAllEventPhotos(event.id);

    if (isLoading) {
        return <></>;
    }

    if (!photos) {
        return <></>;
    }

    const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;
    const prevPhoto = selectedIndex !== null ? photos[selectedIndex - 1] : null;
    const nextPhoto = selectedIndex !== null ? photos[selectedIndex + 1] : null;

    return (
        <>
            {photos.length > 0 ? (
                <Box p="xs">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 750: 3, 900: 4 }}>
                        <Masonry>
                            {photos?.map((photo, index) => (
                                <Image
                                    onClick={() => {
                                        console.log(index);
                                        setSelectedIndex(index);
                                    }}
                                    key={photo.id}
                                    src={`${config.pocketbase.photosUrl}/${photo.id}/${photo.file}`}
                                    alt="Photo"
                                    style={{ cursor: "pointer" }}
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
            {selectedIndex !== null && (
                <>
                    <Box
                        style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0,
                            zIndex: 1001,
                        }}
                    >
                        <Image
                            src={`${config.pocketbase.photosUrl}/${selectedPhoto?.id}/${selectedPhoto?.file}`}
                            alt="Photo"
                            fit="contain"
                            style={{ width: "100%", height: "100%" }}
                        />
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color="blue"
                            style={{ position: "fixed", right: 20, zIndex: 1000, top: 20 }}
                            onClick={() => setSelectedIndex(null)}
                        >
                            <IconX />
                        </ActionIcon>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color="blue"
                            style={{ position: "fixed", left: 20, zIndex: 1000, top: "50%" }}
                            disabled={!prevPhoto}
                            onClick={() => selectedIndex !== null && setSelectedIndex(selectedIndex - 1)}
                        >
                            <IconArrowLeft />
                        </ActionIcon>
                        <ActionIcon
                            size="xl"
                            variant="filled"
                            color="blue"
                            style={{ position: "fixed", right: 20, zIndex: 1000, top: "50%" }}
                            disabled={!nextPhoto}
                            onClick={() => selectedIndex !== null && setSelectedIndex(selectedIndex + 1)}
                        >
                            <IconArrowRight />
                        </ActionIcon>
                    </Box>
                    <Overlay color="#000" backgroundOpacity={0.85} zIndex={1000} />
                </>
            )}
        </>
    );
}

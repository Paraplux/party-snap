import { useEvent } from "@/features/events/hooks/useEvents";
import { Navigate, useParams } from "react-router";
import { EventNotFound } from "./NotFound";
import { useCookies } from "react-cookie";
import { useGuest } from "@/features/guests/hooks/useGuests";
import { EventHeader } from "./components/EventHeader";
import { ActionIcon, Box, Button, Drawer, Image, Loader, Space, Text } from "@mantine/core";
import { Center } from "@mantine/core";
import { IconTrash, IconPlus, IconCamera, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import { useAddPhotos, useAllEventPhotos } from "@/features/photos/hooks/usePhotos";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { config } from "@/app/config";
import SpeedDial from "@/components/ui/SpeedDial";

export const Event = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [cookies] = useCookies([`guest_id_${eventId}`]);
    const [photos, setPhotos] = useState<File[]>([]);

    const { data: guest, isLoading: isGuestLoading } = useGuest(eventId, cookies[`guest_id_${eventId}`]);
    const { data: event, isLoading: isEventLoading } = useEvent(eventId);
    const { data: allPhotos, isLoading: isPhotosLoading } = useAllEventPhotos(eventId);

    const { mutate: addPhotos } = useAddPhotos({
        onSuccess: () => {
            setPhotos([]);
        },
    });

    if (isGuestLoading || isEventLoading || isPhotosLoading || !allPhotos) {
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

    const handleCameraSelection = () => {
        const input = document.getElementById("photo-input") as HTMLInputElement;
        if (input) {
            input.setAttribute("capture", "environment");
            input.click();
            // On retire capture après le clic pour le prochain choix
            setTimeout(() => input.removeAttribute("capture"), 100);
        }
    };

    const handleGallerySelection = () => {
        const input = document.getElementById("photo-input") as HTMLInputElement;
        if (input) {
            input.removeAttribute("capture");
            input.click();
        }
    };

    const handleAddPhotos = () => {
        addPhotos({
            guestId: guest.id,
            eventId: event.id,
            photos: photos.map((photo) => ({
                name: photo.name,
                tags: [],
                file: photo,
            })),
        });
    };

    return (
        <Box>
            <EventHeader event={event} />
            <Space h="md" />
            {allPhotos.length > 0 ? (
                <Box p="xs">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 750: 3, 900: 4 }}>
                        <Masonry>
                            {allPhotos?.map((photo) => (
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
                <Box p="xs">
                    <Space h="xl" />
                    <Text ta="center" size="sm" c="dimmed">
                        Aucune photo trouvée. Ajoutez des photos pour commencer.
                    </Text>
                </Box>
            )}
            <Drawer
                closeOnClickOutside
                closeOnEscape
                zIndex={210}
                styles={{
                    content: {
                        borderRadius: "16px 16px 0 0",
                    },
                }}
                position="bottom"
                opened={photos.length > 0}
                onClose={() => null}
                withCloseButton={false}
            >
                <Box
                    style={{
                        paddingTop: 16,
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "20%",
                            height: 6,
                            backgroundColor: "#000",
                            borderRadius: 4,
                            opacity: 0.7,
                        }}
                    />
                    <Text size="sm" c="dimmed">
                        {photos.length} photo{photos.length > 1 ? "s" : ""} sélectionnée{photos.length > 1 ? "s" : ""}
                    </Text>
                    <Button variant="subtle" onClick={handleAddPhotos}>
                        Confirmer
                    </Button>
                </Box>
                <Space h="md" />
                <Box>
                    {photos.map((photo) => (
                        <Box component="span" pos="relative" key={photo.name} style={{ display: "inline-block" }}>
                            <Image src={URL.createObjectURL(photo)} alt="Photo" style={{ width: 120, height: 120 }} />
                            <ActionIcon
                                variant="filled"
                                color="red"
                                pos="absolute"
                                top={-8}
                                right={-8}
                                radius="xl"
                                size="sm"
                                onClick={() => setPhotos(photos.filter((p) => p !== photo))}
                            >
                                <IconTrash size={16} />
                            </ActionIcon>
                        </Box>
                    ))}
                </Box>
            </Drawer>
            <SpeedDial
                icon={<IconPlus />}
                items={[
                    {
                        icon: <IconCamera size={16} />,
                        onClick: handleCameraSelection,
                    },
                    {
                        icon: <IconPhoto size={16} />,
                        onClick: handleGallerySelection,
                    },
                ]}
            />

            <input
                style={{ display: "none" }}
                multiple
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                        setPhotos(Array.from(files));
                    }
                }}
            />
        </Box>
    );
};

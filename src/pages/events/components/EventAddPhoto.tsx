import { ActionIcon, Box, Button, Image, Space, Drawer } from "@mantine/core";
import type { Event } from "@/features/events/hooks/useEvents";
import type { Guest } from "@/features/guests/hooks/useGuests";
import { useAddPhotos } from "@/features/photos/hooks/usePhotos";
import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import SpeedDial from "@/components/ui/SpeedDial";

interface EventAddPhotoProps {
    guest: Guest;
    event: Event;
}

export default function EventAddPhoto({ guest, event }: EventAddPhotoProps) {
    const [photos, setPhotos] = useState<File[]>([]);

    const { mutate: addPhotos } = useAddPhotos({
        onSuccess: () => {
            setPhotos([]);
        },
    });

    const handleCameraSelection = () => {
        const input = document.getElementById("photo-input-camera") as HTMLInputElement;
        if (input) {
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
        <>
            <Drawer
                closeOnClickOutside={true}
                closeOnEscape={true}
                zIndex={210}
                styles={{
                    content: {
                        borderRadius: "16px 16px 0 0",
                    },
                }}
                position="bottom"
                opened={photos.length > 0}
                onClose={() => setPhotos([])}
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
                    <Button variant="subtle" onClick={() => setPhotos([])}>
                        Annuler
                    </Button>
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
            <SpeedDial icon={<IconPlus />} items={[]} onClick={handleCameraSelection} />

            <input
                style={{ display: "none" }}
                multiple
                id="photo-input-camera"
                type="file"
                accept="image/*;capture=camera"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                        setPhotos(Array.from(files));
                    }
                }}
            />
            <input
                style={{ display: "none" }}
                multiple
                id="photo-input-gallery"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                        setPhotos(Array.from(files));
                    }
                }}
            />
        </>
    );
}

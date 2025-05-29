import { ActionIcon, Box, Button, Image, Space, Text, Drawer } from "@mantine/core";
import type { Event } from "@/features/events/hooks/useEvents";
import type { Guest } from "@/features/guests/hooks/useGuests";
import { useAddPhotos } from "@/features/photos/hooks/usePhotos";
import { useState } from "react";
import { IconCamera, IconPhoto, IconPlus, IconTrash } from "@tabler/icons-react";
import SpeedDial from "@/components/ui/SpeedDial";
import useMobile from "@/components/hooks/useMobile";

interface EventAddPhotoProps {
    guest: Guest;
    event: Event;
}

export default function EventAddPhoto({ guest, event }: EventAddPhotoProps) {
    const [photos, setPhotos] = useState<File[]>([]);
    const { isAndroid, isIOS, isDesktop } = useMobile();

    const { mutate: addPhotos } = useAddPhotos({
        onSuccess: () => {
            setPhotos([]);
        },
    });

    const handleGallerySelection = () => {
        const input = document.getElementById("photo-input-gallery") as HTMLInputElement;
        if (input) {
            input.click();
        }
    };
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

    const actions = [
        {
            icon: <IconCamera size={16} />,
            visible: isAndroid,
            onClick: handleCameraSelection,
        },
        {
            icon: <IconPhoto size={16} />,
            visible: isAndroid,
            onClick: handleGallerySelection,
        },
    ];

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
                items={isAndroid ? actions : []}
                onClick={() => {
                    if (isAndroid) {
                        return undefined;
                    }
                    if (isIOS) {
                        handleCameraSelection();
                    }
                    if (isDesktop) {
                        handleGallerySelection();
                    }
                }}
            />

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

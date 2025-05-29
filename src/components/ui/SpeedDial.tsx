import { ActionIcon, Affix, Box, type MantineStyleProp } from "@mantine/core";
import { useState } from "react";

interface SpeedDialProps {
    icon: React.ReactNode;
    items?: {
        icon: React.ReactNode;
        visible: boolean;
        onClick: () => void;
    }[];
    onClick?: () => void;
    style?: MantineStyleProp;
}

export default function SpeedDial({ icon, items, style, onClick }: SpeedDialProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Affix style={{ ...style }} position={{ bottom: 20, right: 20 }}>
            <Box pos="relative">
                <ActionIcon
                    variant="filled"
                    color="blue"
                    radius="xl"
                    style={{
                        width: 50,
                        height: 50,
                        boxShadow:
                            "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
                    }}
                    onClick={() => {
                        if (onClick) {
                            onClick();
                        } else {
                            setIsOpen((prev) => !prev);
                        }
                    }}
                >
                    {icon}
                </ActionIcon>
                {items && isOpen && (
                    <Box
                        pos="absolute"
                        bottom={60}
                        right={4}
                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                        {items
                            .filter((item) => item.visible)
                            .map((item, index) => (
                                <ActionIcon
                                    key={`speed-dial-item-${index}`}
                                    variant="filled"
                                    color="dark"
                                    radius="xl"
                                    size="xl"
                                    onClick={() => {
                                        item.onClick();
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        boxShadow:
                                            "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
                                    }}
                                >
                                    {item.icon}
                                </ActionIcon>
                            ))}
                    </Box>
                )}
            </Box>
        </Affix>
    );
}

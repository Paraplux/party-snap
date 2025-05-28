import { ActionIcon, Affix, Box, type MantineStyleProp } from "@mantine/core";
import { useState } from "react";

interface SpeedDialProps {
    icon: React.ReactNode;
    items?: {
        icon: React.ReactNode;
        onClick: () => void;
    }[];
    style?: MantineStyleProp;
}

export default function SpeedDial({ icon, items, style }: SpeedDialProps) {
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
                    }}
                    onClick={() => setIsOpen(!isOpen)}
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
                        {items.map((item, index) => (
                            <ActionIcon
                                key={`speed-dial-item-${index}`}
                                variant="filled"
                                color="dark"
                                radius="xl"
                                size="xl"
                                onClick={item.onClick}
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

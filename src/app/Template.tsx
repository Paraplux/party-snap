import { useState } from "react";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import mantineLogo from "/mantine.svg";
import pocketbaseLogo from "/pocketbase.svg";
import "./Template.css";
import { Button, Code, Group, Image, Stack, Text, Title } from "@mantine/core";

export default function Template() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Stack align="center" justify="center" gap="md">
                <Group>
                    <a href="https://vite.dev" target="_blank" rel="noreferrer">
                        <Image src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noreferrer">
                        <Image src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                    <a href="https://mantine.dev" target="_blank" rel="noreferrer">
                        <Image src={mantineLogo} className="logo" alt="Mantine logo" />
                    </a>
                    <a href="https://pocketbase.io" target="_blank" rel="noreferrer">
                        <Image src={pocketbaseLogo} className="logo" alt="Pocketbase logo" />
                    </a>
                </Group>
                <Title order={1}>Vite + React + Mantine + Pocketbase</Title>
                <Button onClick={() => setCount((count) => count + 1)}>Click me. Count is {count}</Button>
                <Text>
                    Edit <Code>src/App.tsx</Code> and save to test HMR
                </Text>
                <Text c="dimmed">Click on the Vite and React logos to learn more</Text>
            </Stack>
        </>
    );
}

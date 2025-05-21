import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <MantineProvider>{children}</MantineProvider>
        </BrowserRouter>
    );
}

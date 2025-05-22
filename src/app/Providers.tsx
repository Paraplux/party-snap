import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MantineProvider>{children}</MantineProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

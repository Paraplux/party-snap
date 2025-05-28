import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MantineProvider>
                    <ToastContainer />
                    <CookiesProvider>{children}</CookiesProvider>
                </MantineProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

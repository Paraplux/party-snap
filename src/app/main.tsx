import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../assets/css/index.css";
import Providers from "./Providers.tsx";
import { Router } from "./router.tsx";

// biome-ignore lint/style/noNonNullAssertion:
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Providers>
            <Router />
        </Providers>
    </StrictMode>,
);

import { Routes, Route } from "react-router";
import Template from "./Template";
import Auth from "@/pages/auth/Login";

export const Router = () => {
    return (
        <Routes>
            <Route index element={<Template />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    );
};

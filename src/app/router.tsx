import { Routes, Route } from "react-router";
import Auth from "@/pages/auth/Login";
import Home from "@/pages/home/Home";
import Layout from "@/components/layout/Layout";

export const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Route>
        </Routes>
    );
};

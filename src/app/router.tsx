import { Routes, Route } from "react-router";
import Auth from "@/pages/auth/Login";
import Home from "@/pages/home/Home";
import Layout from "@/components/layout/Layout";
import { EventsGuard, GuestsCookieGuard } from "./guards";
import { GuestCreation } from "@/pages/guests/GuestCreation";
import { Event } from "@/pages/events/Event";

export const Router = () => {
    return (
        <Routes>
            <Route>
                <Route index element={<div>Home page reached</div>} />
                <Route path="events">
                    <Route index element={<div>Events list page reached</div>} />
                    <Route path=":eventId">
                        <Route
                            index
                            element={
                                <GuestsCookieGuard>
                                    <EventsGuard>
                                        <Event />
                                    </EventsGuard>
                                </GuestsCookieGuard>
                            }
                        />
                        <Route path="guests/create" element={<GuestCreation />} />
                    </Route>
                </Route>
            </Route>
            <Route path="app" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="auth" element={<Auth />} />
            </Route>
        </Routes>
    );
};

import { useAuth, useLogout } from "@/features/auth/hooks/useAuth";
import { Badge, Box } from "@mantine/core";
import { Outlet, useNavigate } from "react-router";

export default function Layout() {
    const navigate = useNavigate();
    const { mutate: logout } = useLogout({
        onSuccess: () => {
            navigate("/login");
        },
    });
    const { isAuthenticated } = useAuth();

    return (
        <Box pos="relative">
            <Badge
                styles={{
                    root: {
                        zIndex: 1000,
                        cursor: "pointer",
                    },
                }}
                onClick={() => logout()}
                pos="absolute"
                top={4}
                right={4}
                color={isAuthenticated ? "green" : "red"}
            >
                {isAuthenticated ? "Authenticated" : "Not Authenticated"}
            </Badge>
            <Outlet />
        </Box>
    );
}

import { config } from "@/app/config";
import { useAuth, useLogout } from "@/features/auth/hooks/useAuth";
import { Avatar, Box, Button, Group, Text } from "@mantine/core";
import { Outlet, useNavigate } from "react-router";

export default function Layout() {
    const navigate = useNavigate();
    const { mutate: logout } = useLogout({
        onSuccess: () => {
            navigate("/auth");
        },
    });
    const { currentUser } = useAuth();

    return (
        <Box>
            {currentUser && (
                <Group justify="flex-end">
                    <Group>
                        <Avatar src={`${config.pocketbase.avatarUrl}/${currentUser.id}/${currentUser.avatar}`} />
                        <Text>
                            {currentUser.name} ({currentUser.email})
                        </Text>
                    </Group>
                    <Button onClick={() => logout()}>Logout</Button>
                </Group>
            )}
            <Outlet />
        </Box>
    );
}

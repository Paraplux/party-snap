import {
    Anchor,
    Button,
    Container,
    Group,
    Paper,
    type PaperProps,
    PasswordInput,
    Space,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { authService } from "@services/auth.pocketbase";

export default function Auth(props: PaperProps) {
    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
            passwordConfirm: (val, values) =>
                type === "register" && val !== values.password ? "Passwords do not match" : null,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        if (type === "register") {
            try {
                const response = await authService.register({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await authService.login({
                    email: values.email,
                    password: values.password,
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container size="xs">
            <Paper radius="md" p="lg" withBorder {...props}>
                <Text size="lg" fw={500}>
                    {upperFirst(type)}
                </Text>
                <Space h="md" />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        {type === "register" && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            error={form.errors.email && "Invalid email"}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                            error={form.errors.password && "Password should include at least 6 characters"}
                            radius="md"
                        />

                        {type === "register" && (
                            <PasswordInput
                                required
                                label="Confirm password"
                                placeholder="Confirm your password"
                                value={form.values.passwordConfirm}
                                onChange={(event) => form.setFieldValue("passwordConfirm", event.currentTarget.value)}
                                error={form.errors.passwordConfirm && "Passwords do not match"}
                                radius="md"
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}

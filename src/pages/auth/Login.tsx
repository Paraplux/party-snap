import { GoogleButton } from "@/features/auth/components/GoogleButton";
import { useLogin, useOAuthLogin, useRegister } from "@/features/auth/hooks/useAuth";
import {
    Anchor,
    Button,
    Container,
    Divider,
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
import { useNavigate } from "react-router";
export default function Auth(props: PaperProps) {
    const navigate = useNavigate();
    const { mutate: login } = useLogin({
        onSuccess: () => {
            navigate("/");
        },
    });
    const { mutate: register } = useRegister({
        onSuccess: () => {
            navigate("/");
        },
    });
    const { mutate: oAuthLogin } = useOAuthLogin({
        onSuccess: () => {
            navigate("/");
        },
    });
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
                register({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                });
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                login({
                    email: values.email,
                    password: values.password,
                });
                navigate("/");
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
                <Group justify="center">
                    <GoogleButton onClick={() => oAuthLogin({ provider: "google" })} radius="xl">
                        Google
                    </GoogleButton>
                </Group>
                <Divider label="Or continue with email" labelPosition="center" my="lg" />
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

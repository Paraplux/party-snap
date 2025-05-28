import { TextInput, Button, Paper, Title, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router";
import { useAddGuest } from "@/features/guests/hooks/useGuests";
import { useEvent } from "@/features/events/hooks/useEvents";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

interface GuestFormValues {
    name: string;
}

const ONE_YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;

export function GuestCreation() {
    const { eventId } = useParams<{ eventId: string }>();
    const [, setCookie] = useCookies([`guest_id_${eventId}`]);
    const navigate = useNavigate();
    const { data: event } = useEvent(eventId ?? "");
    const { mutate: addGuest, isPending } = useAddGuest({
        onSuccess: (data) => {
            toast.success("Inscription réussie !");
            setCookie(`guest_id_${eventId}`, data.id, {
                path: "/",
                expires: new Date(Date.now() + ONE_YEAR_IN_MS),
            });
            navigate(`/events/${eventId}`);
        },
        onError: () => {
            toast.error("Une erreur est survenue lors de l'inscription");
        },
    });

    const form = useForm<GuestFormValues>({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => (value.trim().length < 2 ? "Le nom doit contenir au moins 2 caractères" : null),
        },
    });

    const handleSubmit = async (values: GuestFormValues) => {
        if (!eventId || !event) {
            toast.error("Événement non trouvé");
            return;
        }
        addGuest({
            name: values.name.trim(),
            event: eventId,
        });
    };

    if (!event) {
        return (
            <Text c="dimmed" ta="center">
                Chargement de l'événement...
            </Text>
        );
    }

    return (
        <Paper radius="md" p="xl" withBorder>
            <Title order={2} ta="center" mb="lg">
                S'inscrire à {event.name}
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="Votre nom"
                        placeholder="Entrez votre nom"
                        required
                        {...form.getInputProps("name")}
                    />

                    <Button type="submit" fullWidth mt="md" loading={isPending}>
                        S'inscrire
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default GuestCreation;

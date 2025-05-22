import { config } from "@/app/config";
import { useAddPhotos, usePhotos } from "@/features/photos/hooks/usePhotos";
import { Box, Button, Card, Divider, Group, Loader, Space, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface FormValues {
    files: File[];
}

export default function Home() {
    const form = useForm<FormValues>({
        initialValues: {
            files: [],
        },
    });

    const { data: photos, isLoading } = usePhotos();
    const { mutate: addPhotos } = useAddPhotos({
        onSuccess: () => {
            form.reset();
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        form.setFieldValue("files", files);
    };

    const handleSubmit = (values: FormValues) => {
        const photosToAdd = values.files.map((file) => ({
            file,
            name: file.name,
            tags: [],
        }));
        addPhotos(photosToAdd);
    };

    if (!photos || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Card>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Group>
                        <input
                            style={{ display: "none" }}
                            id="files-upload-button"
                            multiple
                            type="file"
                            name="files[]"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                        />
                        <Button onClick={() => document.getElementById("files-upload-button")?.click()}>
                            Ajouter une ou des images
                        </Button>
                        <Button type="submit">Upload</Button>
                    </Group>
                </form>
                <Space h="md" />
                {form.values.files && <Text>{form.values.files.length} images à uploader</Text>}
                <Group>
                    {form.values.files.map((file) => (
                        <img key={file.name} width={100} src={URL.createObjectURL(file)} alt={file.name} />
                    ))}
                </Group>
            </Card>
            <Divider />
            <Card>
                Mes photos ({photos.length}) :
                <Space h="md" />
                <Group>
                    {photos.map((photo) => (
                        <img
                            key={photo.id}
                            width={100}
                            src={`${config.pocketbase.photosUrl}/${photo.id}/${photo.file}`}
                            alt={photo.name}
                        />
                    ))}
                </Group>
            </Card>
        </Box>
    );
}

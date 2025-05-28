const isProduction = window.location.origin.includes("partysnap.uggyboogie.fr");

export const config = {
    pocketbase: {
        url: isProduction ? "https://api.partysnap.uggyboogie.fr" : "http://localhost:8092",
        avatarUrl: isProduction
            ? "https://api.partysnap.uggyboogie.fr/api/files/users"
            : "http://localhost:8092/api/files/users",
        photosUrl: isProduction
            ? "https://api.partysnap.uggyboogie.fr/api/files/photos"
            : "http://localhost:8092/api/files/photos",
    },
};

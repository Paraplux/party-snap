import { pb } from "./service.pocketbase";

export const appService = {
    users: pb.collection("users"),
    events: pb.collection("events"),
    photos: pb.collection("photos"),
    tags: pb.collection("tags"),
    createBatch: () => pb.createBatch(),
};

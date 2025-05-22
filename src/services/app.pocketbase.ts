import { pb } from "./service.pocketbase";

export const appService = {
    photos: pb.collection("photos"),
    tags: pb.collection("tags"),
};

import { pb } from "./service.pocketbase";

export const appService = {
    eventsView: pb.collection("events_view"),
    events: pb.collection("events"),
    eventTags: pb.collection("event_tags"),
    guests: pb.collection("guests"),
    photos: pb.collection("photos"),
    photoTags: pb.collection("photo_tags"),
    users: pb.collection("users"),
    createBatch: () => pb.createBatch(),
};

import PocketBase from "pocketbase";
import { config } from "@/app/config";

export const pb = new PocketBase(config.pocketbase.url);

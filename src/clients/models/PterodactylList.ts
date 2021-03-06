import { Metadata } from "./Metadata";
import { PterodactylObject } from "./PterodactylObject";

export interface PterodactylList<T> {
    object: string;
    data: PterodactylObject<T>[];
    meta?: Metadata;
}

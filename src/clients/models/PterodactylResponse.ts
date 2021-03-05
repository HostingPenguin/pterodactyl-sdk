import { Metadata } from "./Metadata";

export interface PterodactylResponse<T> {
    object: string;
    data?: T[];
    attributes?: T;
    meta: Metadata;
}

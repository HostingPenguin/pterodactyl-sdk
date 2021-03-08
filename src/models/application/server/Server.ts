import { Server as ClientServer } from "../../client/server/Server";
import { Container } from "./Container";

export interface Server extends ClientServer {
    externalId: number;
    allocation: number;
    nest: number;
    egg: number;
    pack: number | null;
    container: Container;
    updatedAt: Date;
    createdAt: Date;
}

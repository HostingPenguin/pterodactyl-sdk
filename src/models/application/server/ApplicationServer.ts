import { Server } from "../../client/server/Server";
import { ServerBase } from "../../ServerBase";
import { Container } from "./Container";

export interface ApplicationServer extends ServerBase {
    externalId: string;
    allocation: number;
    user: number;
    node: number;
    nest: number;
    egg: number;
    pack: number | null;
    container: Container;
    updatedAt: Date;
    createdAt: Date;
}

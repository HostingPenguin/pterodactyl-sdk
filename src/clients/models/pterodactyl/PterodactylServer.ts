import { PterodactylServerBase } from "./PterodactylServerBase";

export interface PterodactylServer extends PterodactylServerBase {
    node: string;
    sftp_details: {
        ip: string;
        port: number;
    };
}

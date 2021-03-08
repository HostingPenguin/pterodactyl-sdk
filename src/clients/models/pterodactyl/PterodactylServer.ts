import { PterodactylList } from "../PterodactylList";
import { PterodactylObject } from "../PterodactylObject";
import { PterodactylAllocation } from "./PterodactylAllocation";

export interface PterodactylServer {
    server_owner: boolean;
    identifier: string;
    internal_id: number;
    uuid: string;
    name: string;
    node: string;
    sftp_details: {
        ip: string;
        port: number;
    };
    description: string;
    limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    };
    invocation: string;
    docker_image: string;
    egg_features: any;
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    is_suspended: boolean;
    is_installing: boolean;
    is_transferring: boolean;
    relationships: {
        allocations: PterodactylList<PterodactylAllocation>;
    };
}

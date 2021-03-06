import { PterodactylPermission } from "./PterodactylPermission";

export interface PterodactylPermissions {
    permissions: {
        websocket: PterodactylPermission;
        control: PterodactylPermission;
        user: PterodactylPermission;
        file: PterodactylPermission;
        backup: PterodactylPermission;
        allocation: PterodactylPermission;
        startup: PterodactylPermission;
        database: PterodactylPermission;
        schedule: PterodactylPermission;
        settings: PterodactylPermission;
    };
}

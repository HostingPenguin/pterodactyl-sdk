import { Permission } from "./Permission";

export interface ClientPermissions {
    websocket: Permission;
    control: Permission;
    user: Permission;
    file: Permission;
    backup: Permission;
    allocation: Permission;
    startup: Permission;
    database: Permission;
    schedule: Permission;
    settings: Permission;
}

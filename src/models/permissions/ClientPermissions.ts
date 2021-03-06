import { Permission } from "./Permission";

export class ClientPermissions {
    public websocket: Permission;
    public control: Permission;
    public user: Permission;
    public file: Permission;
    public backup: Permission;
    public allocation: Permission;
    public startup: Permission;
    public database: Permission;
    public schedule: Permission;
    public settings: Permission;
}

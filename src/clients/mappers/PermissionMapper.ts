import { ClientPermissions } from "../../models/permissions/ClientPermissions";
import { Permission } from "../../models/permissions/Permission";
import { PterodactylPermission } from "../models/pterodactyl/permissions/PterodactylPermission";
import { PterodactylPermissions } from "../models/pterodactyl/permissions/PterodactylPermissions";
import { PterodactylObject } from "../models/PterodactylObject";

export class PermissionMapper {
    /**
     * Maps a Pterodactyl permissions objects to a list of Permissions models.
     * @param objects a permissions object.
     * @returns {Permission} permission model.
     */
    private static mapToPermission(object: PterodactylPermission): Permission {
        let permission = new Permission();

        permission.description = object.description;
        permission.keys = object.keys;

        return permission;
    }

    /**
     * Maps a Pterodactyl permissions objects to a list of Permissions models.
     * @param objects a permissions object.
     * @returns {ClientPermissions}
     */
    public static mapToClientPermissions(object: PterodactylObject<PterodactylPermissions>): ClientPermissions {
        let permissions = object.attributes.permissions;
        let clientPermissions = new ClientPermissions();

        clientPermissions.websocket = this.mapToPermission(permissions.websocket);
        clientPermissions.control = this.mapToPermission(permissions.control);
        clientPermissions.user = this.mapToPermission(permissions.user);
        clientPermissions.file = this.mapToPermission(permissions.file);
        clientPermissions.backup = this.mapToPermission(permissions.backup);
        clientPermissions.allocation = this.mapToPermission(permissions.allocation);
        clientPermissions.startup = this.mapToPermission(permissions.startup);
        clientPermissions.database = this.mapToPermission(permissions.database);
        clientPermissions.schedule = this.mapToPermission(permissions.schedule);
        clientPermissions.settings = this.mapToPermission(permissions.settings);

        return clientPermissions;
    }
}

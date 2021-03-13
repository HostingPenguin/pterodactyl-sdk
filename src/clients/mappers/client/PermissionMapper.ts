import { ClientPermissions } from "../../../models/permissions/ClientPermissions";
import { Permission } from "../../../models/permissions/Permission";
import { PterodactylPermission } from "../../models/pterodactyl/permissions/PterodactylPermission";
import { PterodactylPermissions } from "../../models/pterodactyl/permissions/PterodactylPermissions";
import { PterodactylObject } from "../../models/PterodactylObject";

export class PermissionMapper {
    /**
     * Maps a Pterodactyl permissions objects to a list of Permissions models.
     * @param objects a permissions object.
     * @returns {Permission} permission model.
     */
    private static mapToPermission(object: PterodactylPermission): Permission {
        const permission: Permission = {
            description: object.description,
            keys: object.keys
        };

        return permission;
    }

    /**
     * Maps a Pterodactyl permissions objects to a list of Permissions models.
     * @param objects a permissions object.
     * @returns {ClientPermissions}
     */
    public static mapToClientPermissions(object: PterodactylObject<PterodactylPermissions>): ClientPermissions {
        const permissions = object.attributes.permissions;
        const clientPermissions: ClientPermissions = {
            websocket: this.mapToPermission(permissions.websocket),
            control: this.mapToPermission(permissions.control),
            user: this.mapToPermission(permissions.user),
            file: this.mapToPermission(permissions.file),
            backup: this.mapToPermission(permissions.backup),
            allocation: this.mapToPermission(permissions.allocation),
            startup: this.mapToPermission(permissions.startup),
            database: this.mapToPermission(permissions.database),
            schedule: this.mapToPermission(permissions.schedule),
            settings: this.mapToPermission(permissions.settings)
        };

        return clientPermissions;
    }
}

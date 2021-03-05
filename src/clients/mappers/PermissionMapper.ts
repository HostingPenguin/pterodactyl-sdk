import { ObjectMapper } from "jackson-js";
import { Permissions } from "../../models/permissions/Permissions";

export class PermissionMapper {
    private static mapper = new ObjectMapper();

    /**
     * Maps a permissions objects to a list of Permissions models.
     * @param objects a permissions object.
     * @returns
     */
    public static mapToPermissions(object: any): Permissions {
        return this.mapper.parse<Permissions>(JSON.stringify(object), {
            mainCreator: () => [Permissions],
        });
    }
}

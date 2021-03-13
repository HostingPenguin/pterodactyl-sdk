import { PermissionMapper } from "../../clients/mappers/PermissionMapper";
import { PterodactylPermissions } from "../../clients/models/pterodactyl/permissions/PterodactylPermissions";
import { PterodactylObject } from "../../clients/models/PterodactylObject";
import { ClientPermissions } from "../../models/permissions/ClientPermissions";
import { DalBase } from "../DalBase";

export class PermissionDal extends DalBase {
    //#region Public methods

    /**
     * Gets all the client permissions.
     */
    public getPermissions(): Promise<ClientPermissions> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylObject<PterodactylPermissions>>(`/api/client/permissions`)
                .then((response) => {
                    const pterodactylObject = response.data;
                    const permissions = PermissionMapper.mapToClientPermissions(pterodactylObject);
                    resolve(permissions);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //#endregion
}

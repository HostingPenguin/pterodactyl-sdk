import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Server } from "../models/servers/Server";
import { ClientPermissions } from "../models/permissions/ClientPermissions";
import { ApiClient } from "./ApiClient";
import { ServerMapper } from "./mappers/ServerMapper";
import { PermissionMapper } from "./mappers/PermissionMapper";
import { PterodactylObject } from "./models/PterodactylObject";
import { PterodactylList } from "./models/PterodactylList";
import { PterodactylServer } from "./models/pterodactyl/PterodactylServer";
import { PterodactylPermissions } from "./models/pterodactyl/permissions/PterodactylPermissions";

export class Client extends ApiClient {
    /**
     * Creates an instance of the client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        super(options, credentials);
    }

    //#region public methods

    /**
     * Gets all the servers.
     */
    public getServers(): Promise<Server[]> {
        return new Promise((resolve, reject) => {
            this._getServers().then(resolve).catch(reject);
        });
    }

    /**
     * Gets all the client permissions.
     */
    public getPermissions(): Promise<ClientPermissions> {
        return new Promise((resolve, reject) => {
            this._getPermissions().then(resolve).catch(reject);
        });
    }

    //#endregion

    //#region private methods

    /**
     * Gets all the servers with pagination.
     * @param page
     */
    private _getServers(page?: number): Promise<Server[]> {
        return new Promise((resolve, reject) => {
            let queryParams = [];

            if (page !== undefined) queryParams.push(`page=${page}`);

            let query = queryParams.join("&");
            let urlPostfix = queryParams.length > 0 ? `?${query}` : "";

            this.restClient
                .get<PterodactylList<PterodactylServer>>(`/api/client${urlPostfix}`)
                .then((response) => {
                    var pterodactylList = response.data;
                    var meta = pterodactylList.meta;
                    var servers = ServerMapper.mapToServers(pterodactylList.data);

                    if (meta.pagination.current_page < meta.pagination.total_pages) {
                        this._getServers(meta.pagination.current_page + 1).then((subServers) => {
                            resolve(servers.concat(subServers));
                        });
                    } else {
                        resolve(servers);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Gets all the client permissions.
     */
    private _getPermissions(): Promise<ClientPermissions> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylObject<PterodactylPermissions>>(`/api/client/permissions`)
                .then((response) => {
                    var pterodactylObject = response.data;
                    var permissions = PermissionMapper.mapToClientPermissions(pterodactylObject);
                    resolve(permissions);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //#endregion
}

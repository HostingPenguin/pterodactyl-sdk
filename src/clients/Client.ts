import { Credentials } from "./interfaces/Credentials";
import { Options } from "./interfaces/Options";
import { Server } from "../models/client/server/Server";
import { ClientPermissions } from "../models/permissions/ClientPermissions";
import { ApiClient } from "./ApiClient";
import { ServerMapper } from "./mappers/ServerMapper";
import { PermissionMapper } from "./mappers/PermissionMapper";
import { PterodactylObject } from "./models/PterodactylObject";
import { PterodactylList } from "./models/PterodactylList";
import { PterodactylServer } from "./models/pterodactyl/PterodactylServer";
import { PterodactylPermissions } from "./models/pterodactyl/permissions/PterodactylPermissions";
import { ServerClient } from "./sub-clients/ServerClient";

export class Client extends ApiClient {
    /**
     * The server client to access the client's server endpoints.
     */
    public servers: ServerClient;

    /**
     * Creates an instance of the client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        super(options, credentials);

        this.servers = new ServerClient(options, credentials);
    }

    //#region public methods

    /**
     * Gets all the servers.
     */
    public getServers(): Promise<Server[]> {
        return this._getServers();
    }

    /**
     * Gets all the client permissions.
     */
    public getPermissions(): Promise<ClientPermissions> {
        return this._getPermissions();
    }

    //#endregion

    //#region private methods

    /**
     * Gets all the servers with pagination.
     * @param page
     */
    private _getServers(page?: number): Promise<Server[]> {
        return new Promise((resolve, reject) => {
            const queryParams = [];

            if (page !== undefined) queryParams.push(`page=${page}`);

            const query = queryParams.join("&");
            const urlPostfix = queryParams.length > 0 ? `?${query}` : "";

            this.restClient
                .get<PterodactylList<PterodactylServer>>(`/api/client${urlPostfix}`)
                .then((response) => {
                    const pterodactylList = response.data;
                    const meta = pterodactylList.meta;
                    const servers = ServerMapper.mapToServers(pterodactylList.data);

                    if (meta !== undefined && meta.pagination.current_page < meta.pagination.total_pages) {
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

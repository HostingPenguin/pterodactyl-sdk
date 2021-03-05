import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Server } from "../models/servers/Server";
import { Permissions } from "../models/permissions/Permissions";
import { ApiClient } from "./ApiClient";
import { ServerMapper } from "./mappers/ServerMapper";
import { PterodactylResponse } from "./models/PterodactylResponse";
import { PermissionMapper } from "./mappers/PermissionMapper";

export class Client extends ApiClient {
    /**
     * Creates an instance of the client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        super(options, credentials);
    }

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
                .get<PterodactylResponse<any>>(`/api/client${urlPostfix}`)
                .then((response) => {
                    var data = response.data;
                    var servers = ServerMapper.mapToServers(data.data.filter((s) => s.object == "server").map((s) => s.attributes));
                    if (data.meta.pagination.current_page < data.meta.pagination.total_pages) {
                        this._getServers(data.meta.pagination.current_page + 1).then((subServers) => {
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
     * Gets all the servers.
     */
    public getServers(): Promise<Server[]> {
        return new Promise((resolve, reject) => {
            this._getServers().then(resolve).catch(reject);
        });
    }

    /**
     * Gets all the permissions.
     * @param page
     */
    private _getPermissions(): Promise<Permissions> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylResponse<any>>(`/api/client/permissions`)
                .then((response) => {
                    var data = response.data;
                    var permissions = PermissionMapper.mapToPermissions(data.attributes.permissions);

                    resolve(permissions);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Gets all the permissions.
     */
    public getPermissions(): Promise<Permissions> {
        return new Promise((resolve, reject) => {
            this._getPermissions().then(resolve).catch(reject);
        });
    }
}

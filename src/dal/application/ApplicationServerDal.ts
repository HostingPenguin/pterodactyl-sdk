import { DalBase } from "../DalBase";
import { PterodactylList } from "../../clients/models/PterodactylList";
import { ApplicationServer } from "../../models/application/server/ApplicationServer";
import { PterodactylApplicationServer } from "../../clients/models/pterodactyl/PterodactylApplicationServer";
import { ApplicationServerMapper } from "../../clients/mappers/application/ApplicationServerMapper";
import { PterodactylObject } from "../../clients/models/PterodactylObject";
import { ServerDetailsRequest } from "../../models/requests/application/ServerDetailsRequest";
import { ServerBuildRequest } from "../../models/requests/application/ServerBuildRequest";
import { ServerStartupRequest } from "../../models/requests/application/ServerStartupRequest";
import { PterodactylServerBuildRequest } from "../../clients/models/requests/applications/PterodactylServerBuildRequest";
import { PterodactylServerStartupRequest } from "../../clients/models/requests/applications/PterodactylServerStartupRequest";
import { PterodactylServerDetailsRequest } from "../../clients/models/requests/applications/PterodactylServerDetailsRequest";
import { ServerRequest } from "../../models/requests/application/ServerRequest";
import { PterodactylServerRequest } from "../../clients/models/requests/applications/PterodactylServerRequest";

export class ApplicationServerDal extends DalBase {
    //#region Public methods

    /**
     * Gets all the servers with pagination.
     * @param page
     */
    public getServers(page?: number): Promise<ApplicationServer[]> {
        return new Promise((resolve, reject) => {
            const queryParams = [];

            if (page !== undefined) queryParams.push(`page=${page}`);

            const query = queryParams.join("&");
            const urlPostfix = queryParams.length > 0 ? `?${query}` : "";

            this.restClient
                .get<PterodactylList<PterodactylApplicationServer>>(`/api/application/servers${urlPostfix}`)
                .then((response) => {
                    const pterodactylList = response.data;
                    const meta = pterodactylList.meta;
                    const servers = ApplicationServerMapper.mapToServers(pterodactylList.data);

                    if (meta !== undefined && meta.pagination.current_page < meta.pagination.total_pages) {
                        this.getServers(meta.pagination.current_page + 1).then((subServers) => {
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
     * Gets the server.
     * @param id The server id.
     * @returns Server details.
     */
    public getServer(id: number): Promise<ApplicationServer> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylObject<PterodactylApplicationServer>>(`/api/application/servers/${id}`)
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ApplicationServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    /**
     * Gets the server by external id.
     * @param {string} externalId The server external id.
     * @returns Server details.
     */
    public getServerByExternalId(externalId: string): Promise<ApplicationServer> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylObject<PterodactylApplicationServer>>(`/api/application/servers/external/${externalId}`)
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ApplicationServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    /**
     * Updates the server details.
     * @param {number} serverId The server id.
     * @param {ServerDetailsRequest} detailsRequest The server details.
     * @returns Server.
     */
    public updateDetails(serverId: number, detailsRequest: ServerDetailsRequest): Promise<ApplicationServer> {
        return new Promise((resolve, reject) => {
            const request = ApplicationServerMapper.mapToPterodactylServerDetailsRequest(detailsRequest);
            this.restClient
                .patch<PterodactylObject<PterodactylApplicationServer>, PterodactylServerDetailsRequest>(
                    `/api/application/servers/${serverId}/details`,
                    request
                )
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ApplicationServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    /**
     * Updates the server build.
     * @param {number} serverId The server id.
     * @param {ServerBuildRequest} buildRequest The server build.
     * @returns Server.
     */
    public updateBuild(serverId: number, buildRequest: ServerBuildRequest): Promise<ApplicationServer> {
        return new Promise((resolve, reject) => {
            const request = ApplicationServerMapper.mapToPterodactylServerBuildRequest(buildRequest);
            this.restClient
                .patch<PterodactylObject<PterodactylApplicationServer>, PterodactylServerBuildRequest>(`/api/application/servers/${serverId}/build`, request)
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ApplicationServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    /**
     * Updates the server startup.
     * @param {number} serverId The server id.
     * @param {ServerStartupRequest} startupRequest The server startup.
     * @returns Server.
     */
    public updateStartup(serverId: number, startupRequest: ServerStartupRequest): Promise<ApplicationServer> {
        return new Promise((resolve, reject) => {
            const request = ApplicationServerMapper.mapToPterodactylServerStartupRequest(startupRequest);
            this.restClient
                .patch<PterodactylObject<PterodactylApplicationServer>, PterodactylServerStartupRequest>(
                    `/api/application/servers/${serverId}/startup`,
                    request
                )
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ApplicationServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    /**
     * Creates a new server.
     * @param {ServerRequest} server The server to create.
     * @returns The newly created server.
     */
    public createServer(server: ServerRequest): Promise<ApplicationServer> {
        return new Promise((resolve, reject) => {
            const request = ApplicationServerMapper.mapToPterodactylServerRequest(server);
            this.restClient
                .post<PterodactylObject<PterodactylApplicationServer>, PterodactylServerRequest>(`/api/application/servers`, request)
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ApplicationServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    //#endregion
}

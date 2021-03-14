import { PowerState } from "../../enums/PowerState";

import { PterodactylServer } from "../../clients/models/pterodactyl/PterodactylServer";
import { PterodactylWebsocket } from "../../clients/models/pterodactyl/PterodactylWebsocket";
import { PterodactylStatistics } from "../../clients/models/pterodactyl/resources/PterodactylStatistics";
import { PterodactylObject } from "../../clients/models/PterodactylObject";

import { Server } from "../../models/client/server/Server";
import { Statistics } from "../../models/client/Statistics";
import { Websocket } from "../../models/client/Websocket";

import { DalBase } from "../DalBase";
import { PterodactylList } from "../../clients/models/PterodactylList";
import { ServerMapper } from "../../clients/mappers/client/ServerMapper";
import { WebsocketMapper } from "../../clients/mappers/client/WebsocketMapper";
import { StatisticsMapper } from "../../clients/mappers/client/StatisticsMapper";
import { PterodactylData } from "../../clients/models/PterodactylData";

export class ServerDal extends DalBase {
    //#region Public methods

    /**
     * Gets all the servers with pagination.
     * @param page
     */
    public getServers(page?: number): Promise<Server[]> {
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
     * @param id The server identifier.
     * @returns Server.
     */
    public getServer(id: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylObject<PterodactylServer>>(`/api/client/servers/${id}`)
                .then((response) => {
                    const pterodactylObject = response.data;
                    const server = ServerMapper.mapToServer(pterodactylObject);
                    resolve(server);
                })
                .catch(reject);
        });
    }

    /**
     * Gets the server console details.
     * @param id The server identifier.
     * @returns Console details.
     */
    public getConsoleDetails(id: string): Promise<Websocket> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylData<PterodactylWebsocket>>(`/api/client/servers/${id}/websocket`)
                .then((response) => {
                    const pterodactylData = response.data;
                    const websocket = WebsocketMapper.mapToWebsocket(pterodactylData);
                    resolve(websocket);
                })
                .catch(reject);
        });
    }

    /**
     * Gets the server resource usage.
     * @param id The server identifier.
     * @returns Statistics.
     */
    public getResourceUsage(id: string): Promise<Statistics> {
        return new Promise((resolve, reject) => {
            this.restClient
                .get<PterodactylObject<PterodactylStatistics>>(`/api/client/servers/${id}/resources`)
                .then((response) => {
                    const pterodactylData = response.data;
                    const statistics = StatisticsMapper.mapToStatistics(pterodactylData);
                    resolve(statistics);
                })
                .catch(reject);
        });
    }

    /**
     * Sends command to the specified server.
     * @param {string} id The server identifier.
     * @param {command} command The command.
     */
    public sendCommand(id: string, command: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.restClient
                .post(`/api/client/servers/${id}/command`, { command })
                .then((response) => {
                    if (response.status === 204) resolve();
                    else reject();
                })
                .catch(reject);
        });
    }

    /**
     * Changes the power state of the specified server.
     * @param {string} id The server identifier.
     * @param {command} command The command.
     */
    public changePowerState(id: string, powerState: PowerState): Promise<void> {
        return new Promise((resolve, reject) => {
            this.restClient
                .post(`/api/client/servers/${id}/power`, { signal: powerState })
                .then((response) => {
                    if (response.status === 204) resolve();
                    else reject();
                })
                .catch(reject);
        });
    }

    //#endregion
}

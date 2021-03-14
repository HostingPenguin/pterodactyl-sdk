import { DalBase } from "../DalBase";
import { PterodactylList } from "../../clients/models/PterodactylList";
import { ApplicationServer } from "../../models/application/server/ApplicationServer";
import { PterodactylApplicationServer } from "../../clients/models/pterodactyl/PterodactylApplicationServer";
import { ApplicationServerMapper } from "../../clients/mappers/application/ApplicationServerMapper";
import { PterodactylObject } from "../../clients/models/PterodactylObject";

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

    //#endregion
}
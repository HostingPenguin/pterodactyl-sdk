import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Server } from "../../models/client/server/Server";
import { ApiClient } from "../ApiClient";
import { ServerMapper } from "../mappers/ServerMapper";
import { PterodactylServer } from "../models/pterodactyl/PterodactylServer";
import { PterodactylObject } from "../models/PterodactylObject";

export class ServerClient extends ApiClient {
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
     * Gets the details for a specific server.
     * @param {string} id The server identifier.
     * @returns Server details.
     */
    public getServerDetails(id: string): Promise<Server> {
        if (id === undefined) throw new Error("Id is undefind");
        if (id.length === 0) throw new Error("Id cannot be empty");

        return this._getServerDetails(id);
    }

    //#endregion

    //#region private methods

    /**
     * Gets the server details.
     * @param id The server identifier.
     * @returns Server details.
     */
    private _getServerDetails(id: string): Promise<Server> {
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

    //#endregion
}

import { ApplicationServerDal } from "../../dal/application/ApplicationServerDal";
import { ApplicationServer } from "../../models/application/server/ApplicationServer";
import { ServerBuildRequest } from "../../models/requests/application/ServerBuildRequest";
import { ServerDetailsRequest } from "../../models/requests/application/ServerDetailsRequest";
import { ServerStartupRequest } from "../../models/requests/application/ServerStartupRequest";
import { ClientBase } from "../ClientBase";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";

export class ApplicationServerClient extends ClientBase {
    private serverDal: ApplicationServerDal;

    /**
     * Creates an instance of the client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        super(options, credentials);

        this.serverDal = new ApplicationServerDal(options, credentials);
    }

    //#region public methods

    /**
     * Gets all the servers.
     * @returns List of all the servers.
     */
    public getServers(): Promise<ApplicationServer[]> {
        return this.serverDal.getServers();
    }

    /**
     * Gets a specific server.
     * @param {number} id The server id.
     * @returns Server.
     */
    public getServer(id: number): Promise<ApplicationServer> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id <= 0) throw new Error("Argument `id` cannot be empty");

        return this.serverDal.getServer(id);
    }

    /**
     * Gets a specific server by external id.
     * @param {string} id The server external id.
     * @returns Server.
     */
    public getServerByExternalId(externalId: string): Promise<ApplicationServer> {
        if (externalId === undefined) throw new Error("Argument `externalId` is undefind");
        if (externalId.length <= 0) throw new Error("Argument `externalId` cannot be empty");

        return this.serverDal.getServerByExternalId(externalId);
    }

    /**
     * Updates the server details.
     * @param {number} serverId The server id.
     * @param {ServerDetailsRequest} detailsRequest The server details.
     * @returns Server.
     */
    public updateDetails(serverId: number, detailsRequest: ServerDetailsRequest): Promise<ApplicationServer> {
        if (detailsRequest === undefined) throw new Error("Argument `detailsRequest` is undefind");

        return this.serverDal.updateDetails(serverId, detailsRequest);
    }

    /**
     * Updates the server build.
     * @param {number} serverId The server id.
     * @param {ServerBuildRequest} buildRequest The server build.
     * @returns Server.
     */
    public updateBuild(serverId: number, buildRequest: ServerBuildRequest): Promise<ApplicationServer> {
        if (buildRequest === undefined) throw new Error("Argument `buildRequest` is undefind");

        return this.serverDal.updateBuild(serverId, buildRequest);
    }

    /**
     * Updates the server startup.
     * @param {number} serverId The server id.
     * @param {ServerStartupRequest} startupRequest The server startup.
     * @returns Server.
     */
    public updateStartup(serverId: number, startupRequest: ServerStartupRequest): Promise<ApplicationServer> {
        if (startupRequest === undefined) throw new Error("Argument `startupRequest` is undefind");

        return this.serverDal.updateStartup(serverId, startupRequest);
    }

    //#endregion
}

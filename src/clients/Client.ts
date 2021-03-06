import { Credentials } from "./interfaces/Credentials";
import { Options } from "./interfaces/Options";
import { ClientPermissions } from "../models/permissions/ClientPermissions";
import { ClientBase } from "./ClientBase";
import { ServerClient } from "./sub-clients/ServerClient";
import { PermissionDal } from "../dal/client/PermissionDal";

export class Client extends ClientBase {
    private permissionDal: PermissionDal;

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
        this.permissionDal = new PermissionDal(options, credentials);
    }

    //#region public methods

    /**
     * Gets all the client permissions.
     * @returns The client permissions.
     */
    public getPermissions(): Promise<ClientPermissions> {
        return this.permissionDal.getPermissions();
    }

    //#endregion
}

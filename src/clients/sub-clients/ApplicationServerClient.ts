import { ApplicationServerDal } from "../../dal/application/ApplicationServerDal";
import { ApplicationServer } from "../../models/application/server/ApplicationServer";
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
     * @param {string} id The server id.
     * @returns Server.
     */
    public getServer(id: number): Promise<ApplicationServer> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id <= 0) throw new Error("Argument `id` cannot be empty");

        return this.serverDal.getServer(id);
    }

    //#endregion
}

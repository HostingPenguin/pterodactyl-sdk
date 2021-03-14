import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Server } from "../../models/client/server/Server";
import { ClientBase } from "../ClientBase";
import { Websocket } from "../../models/client/Websocket";
import { Statistics } from "../../models/client/Statistics";
import { PowerState } from "../../enums/PowerState";
import { ServerDal } from "../../dal/client/ServerDal";

export class ServerClient extends ClientBase {
    private serverDal: ServerDal;

    /**
     * Creates an instance of the client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        super(options, credentials);

        this.serverDal = new ServerDal(options, credentials);
    }

    //#region public methods

    /**
     * Gets all the servers.
     * @returns List of all the servers.
     */
    public getServers(): Promise<Server[]> {
        return this.serverDal.getServers();
    }

    /**
     * Gets  a specific server.
     * @param {string} id The server identifier.
     * @returns Server.
     */
    public getServer(id: string): Promise<Server> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id.length === 0) throw new Error("Argument `id` cannot be empty");

        return this.serverDal.getServer(id);
    }

    /**
     * Gets the server console details for a specific sever.
     * @param {string} id The server identifier.
     * @returns Console details.
     */
    public getConsoleDetails(id: string): Promise<Websocket> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id.length === 0) throw new Error("Argument `id` cannot be empty");

        return this.serverDal.getConsoleDetails(id);
    }

    /**
     * Gets the resources usage of a specific server.
     * @param {string} id The server identifier.
     * @returns Statistics.
     */
    public getResourceUsage(id: string): Promise<Statistics> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id.length === 0) throw new Error("Argument `id` cannot be empty");

        return this.serverDal.getResourceUsage(id);
    }

    /**
     * Sends command to the specified server.
     * @param {string} id The server identifier.
     * @param {command} command The command.
     */
    public sendCommand(id: string, command: string): Promise<any> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id.length === 0) throw new Error("Argument `id` cannot be empty");
        if (command === undefined) throw new Error("Argument `command` is undefind");
        if (command.length === 0) throw new Error("Argument `command` cannot be empty");

        return this.serverDal.sendCommand(id, command);
    }

    /**
     * Changes the power state of the specified server.
     * @param {string} id The server identifier.
     * @param {command} command The command.
     */
    public changePowerState(id: string, powerState: PowerState): Promise<any> {
        if (id === undefined) throw new Error("Argument `id` is undefind");
        if (id.length === 0) throw new Error("Argument `id` cannot be empty");
        if (powerState === undefined) throw new Error("Argument `powerState` is undefind");

        return this.serverDal.changePowerState(id, powerState);
    }

    //#endregion
}

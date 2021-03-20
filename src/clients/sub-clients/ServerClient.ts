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
        return new Promise((resolve, reject) => {
            if (id.length === 0) throw new Error("Argument `id` cannot be empty");

            this.serverDal.getServer(id).then(resolve).catch(reject);
        });
    }

    /**
     * Gets the server console details for a specific sever.
     * @param {string} id The server identifier.
     * @returns Console details.
     */
    public getConsoleDetails(id: string): Promise<Websocket> {
        return new Promise((resolve, reject) => {
            if (id.length === 0) throw new Error("Argument `id` cannot be empty");

            this.serverDal.getConsoleDetails(id).then(resolve).catch(reject);
        });
    }

    /**
     * Gets the resources usage of a specific server.
     * @param {string} id The server identifier.
     * @returns Statistics.
     */
    public getResourceUsage(id: string): Promise<Statistics> {
        return new Promise((resolve, reject) => {
            if (id.length === 0) throw new Error("Argument `id` cannot be empty");

            this.serverDal.getResourceUsage(id).then(resolve).catch(reject);
        });
    }

    /**
     * Sends command to the specified server.
     * @param {string} id The server identifier.
     * @param {command} command The command.
     */
    public sendCommand(id: string, command: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (id.length === 0) throw new Error("Argument `id` cannot be empty");
            if (command.length === 0) throw new Error("Argument `command` cannot be empty");

            this.serverDal.sendCommand(id, command).then(resolve).then(reject);
        });
    }

    /**
     * Changes the power state of the specified server.
     * @param {string} id The server identifier.
     * @param {command} command The command.
     */
    public changePowerState(id: string, powerState: PowerState): Promise<any> {
        return new Promise((resolve, reject) => {
            if (id.length === 0) throw new Error("Argument `id` cannot be empty");

            this.serverDal.changePowerState(id, powerState).then(resolve).catch(reject);
        });
    }

    //#endregion
}

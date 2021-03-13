import { ClientBase } from "./ClientBase";
import { Credentials } from "./interfaces/Credentials";
import { Options } from "./interfaces/Options";
import { ApplicationServerClient } from "./sub-clients/ApplicationServerClient";

export class ApplicationClient extends ClientBase {
    /**
     * The server client to access the application's server endpoints.
     */
    public servers: ApplicationServerClient;

    /**
     * Creates an instance of the client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        super(options, credentials);

        this.servers = new ApplicationServerClient(options, credentials);
    }
}

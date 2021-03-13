import { Credentials } from "./interfaces/Credentials";
import { Options } from "./interfaces/Options";

export class ClientBase {
    protected options: Options;
    protected credentials: Credentials;

    /**
     * Creates an instance of the api client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        if (credentials.apiKey === undefined || credentials.apiKey.length === 0) throw new Error("Api key has to be provided for api client");

        this.options = options;
        this.credentials = credentials;
    }
}

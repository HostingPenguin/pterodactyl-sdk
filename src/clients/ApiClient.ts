import { AxiosRequestConfig } from "axios";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { PterodactylResponse } from "./models/PterodactylResponse";
import { RestClient } from "./RestClient";

const apiConfig: AxiosRequestConfig = {
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export class ApiClient {
    protected options: Options;
    protected credentials: Credentials;
    protected restClient: RestClient;

    /**
     * Creates an instance of the api client.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        if (credentials.apiKey === undefined || credentials.apiKey.length == 0) throw new Error("Api key has to be provided for api client");

        this.options = options;
        this.credentials = credentials;

        if (options.baseUrl) apiConfig.baseURL = options.baseUrl;
        if (options.timeout) apiConfig.timeout = options.timeout;

        apiConfig.headers.Authorization = `Bearer ${credentials.apiKey}`;

        this.restClient = new RestClient(apiConfig);
    }
}

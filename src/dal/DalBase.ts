import { AxiosRequestConfig } from "axios";
import { Credentials } from "../clients/interfaces/Credentials";
import { Options } from "../clients/interfaces/Options";
import { RestClient } from "./RestClient";

const apiConfig: AxiosRequestConfig = {
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};

export class DalBase {
    protected credentials: Credentials;
    protected options: Options;
    protected restClient: RestClient;

    /**
     * Creates an instance of the dal.
     * @param {Options} options
     * @param {Credentials} credentials
     */
    constructor(options: Options, credentials: Credentials) {
        this.options = options;
        this.credentials = credentials;

        if (options.baseUrl) apiConfig.baseURL = options.baseUrl;
        if (options.timeout) apiConfig.timeout = options.timeout;

        apiConfig.headers.Authorization = `Bearer ${credentials.apiKey}`;

        this.restClient = new RestClient(apiConfig);
    }
}

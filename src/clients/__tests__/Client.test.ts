import { Client } from "../Client";
import { Credentials } from "../../interfaces/Credentials";
import { Options } from "../../interfaces/Options";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.API_KEY };

test("Initialize client", () => {
    let apiClient: Client = new Client(options, credentials);
    expect(apiClient).toBeDefined();
});

test("Get servers", () => {
    let apiClient: Client = new Client(options, credentials);
    return apiClient.getServers().catch(fail);
});

test("Get permissions", () => {
    let apiClient: Client = new Client(options, credentials);
    return apiClient.getPermissions().catch(fail);
});

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
    return apiClient
        .getServers()
        .then((servers) => {
            expect(servers).toBeDefined;
        })
        .catch(fail);
});

test("Get permissions", () => {
    let apiClient: Client = new Client(options, credentials);
    return apiClient
        .getPermissions()
        .then((permissions) => {
            expect(permissions).toBeDefined();
            expect(permissions.websocket).toBeDefined();
            expect(permissions.control).toBeDefined();
            expect(permissions.user).toBeDefined();
            expect(permissions.file).toBeDefined();
            expect(permissions.backup).toBeDefined();
            expect(permissions.allocation).toBeDefined();
            expect(permissions.startup).toBeDefined();
            expect(permissions.database).toBeDefined();
            expect(permissions.schedule).toBeDefined();
            expect(permissions.settings).toBeDefined();
        })
        .catch(fail);
});

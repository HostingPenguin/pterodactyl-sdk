import { Client } from "../Client";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.CLIENT_API_KEY };

test("Initialize client", () => {
    let client: Client = new Client(options, credentials);
    expect(client).toBeDefined();
});

test("Fail initialize client", () => {
    expect(() => {
        new Client(options, { apiKey: "" });
    }).toThrowError("Api key has to be provided for api client");
});

test("Get server client", () => {
    let client: Client = new Client(options, credentials);
    expect(client.servers).toBeDefined();
});

test("Get permissions", () => {
    let client: Client = new Client(options, credentials);
    return client
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

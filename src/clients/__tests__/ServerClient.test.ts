import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Client } from "../Client";
import { ServerClient } from "../sub-clients/ServerClient";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.API_KEY };

const TEST_SERVER_ID = process.env.TEST_SERVER_ID as string;

test("Initialize server client", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    expect(serverClient).toBeDefined();
});

test("Get server details", () => {
    let client: Client = new Client(options, credentials);
    return client
        .getServers()
        .then((servers) => {
            if (servers.length == 0) fail("Make sure API has access to at least one server");

            return client.servers
                .getServerDetails(servers[0].identifier)
                .then((server) => {
                    expect(server.name).toBeDefined();
                    expect(server.uuid).toBeDefined();
                })
                .catch(fail);
        })
        .catch(fail);
});

test("Get server details", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getServerDetails(TEST_SERVER_ID)
        .then((server) => {
            expect(server).toBeDefined();
            expect(server.identifier).toBeDefined();
        })
        .catch(fail);
});

test("Get console details", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getConsoleDetails(TEST_SERVER_ID)
        .then((websocket) => {
            expect(websocket).toBeDefined();
            expect(websocket.token).toBeDefined();
            expect(websocket.socket).toBeDefined();
        })
        .catch(fail);
});

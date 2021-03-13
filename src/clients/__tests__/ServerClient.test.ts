import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Client } from "../Client";
import { ServerClient } from "../sub-clients/ServerClient";
import { PowerState } from "../../enums/PowerState";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.CLIENT_API_KEY };

const TEST_SERVER_ID = process.env.TEST_SERVER_ID as string;

test("Initialize server client", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    expect(serverClient).toBeDefined();
});

test("Get servers", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getServers()
        .then((servers) => {
            expect(servers).toBeDefined;
        })
        .catch(fail);
});

test("Get server details", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getServers()
        .then((servers) => {
            if (servers.length == 0) fail("Make sure API has access to at least one server");

            return serverClient
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

test("Get resource usage", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getResourceUsage(TEST_SERVER_ID)
        .then((statistics) => {
            expect(statistics).toBeDefined();
            expect(statistics.currentState).toBeDefined();
            expect(statistics.isSuspended).toBeDefined();
            expect(statistics.resources).toBeDefined();
        })
        .catch(fail);
});

test("Send command", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient.sendCommand(TEST_SERVER_ID, "help").catch(fail);
});

test("Change power state", () => {
    let serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .changePowerState(TEST_SERVER_ID, PowerState.KILL)
        .then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    serverClient.changePowerState(TEST_SERVER_ID, PowerState.START).then(resolve).catch(fail);
                }, 2000);
            });
        })
        .catch(fail);
});

import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Client } from "../Client";
import { ServerClient } from "../sub-clients/ServerClient";
import { PowerState } from "../../enums/PowerState";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.CLIENT_API_KEY };

const TEST_SERVER_ID = process.env.TEST_SERVER_ID as string;

test("Initialize server client", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    expect(serverClient).toBeDefined();
});

test("Get servers", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getServers()
        .then((servers) => {
            expect(servers).toBeDefined;
        })
        .catch(fail);
});

test("Get server", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getServers()
        .then((servers) => {
            if (servers.length == 0) fail("Make sure API has access to at least one server");

            return serverClient
                .getServer(servers[0].identifier ?? "")
                .then((server) => {
                    expect(server.name).toBeDefined();
                    expect(server.uuid).toBeDefined();
                })
                .catch(fail);
        })
        .catch(fail);
});

test("Get server by id", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getServer(TEST_SERVER_ID)
        .then((server) => {
            expect(server).toBeDefined();
            expect(server.identifier).toBeDefined();
        })
        .catch(fail);
});

test("Fail get server by id", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return expect(serverClient.getServer("")).rejects.toThrowError("Argument `id` cannot be empty");
});

test("Get console details", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient
        .getConsoleDetails(TEST_SERVER_ID)
        .then((websocket) => {
            expect(websocket).toBeDefined();
            expect(websocket.token).toBeDefined();
            expect(websocket.socket).toBeDefined();
        })
        .catch(fail);
});

test("Fail get console details", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return expect(serverClient.getConsoleDetails("")).rejects.toThrowError("Argument `id` cannot be empty");
});

test("Get resource usage", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
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

test("Fail get resource usage", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return expect(serverClient.getResourceUsage("")).rejects.toThrowError("Argument `id` cannot be empty");
});

test("Send command", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return serverClient.sendCommand(TEST_SERVER_ID, "help").catch(fail);
});

test("Fail send command {id}", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return expect(serverClient.sendCommand("", "help")).rejects.toThrowError("Argument `id` cannot be empty");
});

test("Fail send command {command}", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return expect(serverClient.sendCommand(TEST_SERVER_ID, "")).rejects.toThrowError("Argument `command` cannot be empty");
});

test("Change power state", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
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

test("Fail change power state {id}", () => {
    const serverClient: ServerClient = new ServerClient(options, credentials);
    return expect(serverClient.changePowerState("", PowerState.KILL)).rejects.toThrowError("Argument `id` cannot be empty");
});

import { ServerBuildRequest } from "../../models/requests/application/ServerBuildRequest";
import { ServerDetailsRequest } from "../../models/requests/application/ServerDetailsRequest";
import { ServerStartupRequest } from "../../models/requests/application/ServerStartupRequest";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { ApplicationServerClient } from "../sub-clients/ApplicationServerClient";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.APPLICATION_API_KEY };

const TEST_SERVER_ID = process.env.TEST_SERVER_ID as string;

test("Initialize server client", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    expect(serverClient).toBeDefined();
});

test("Get servers", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return serverClient
        .getServers()
        .then((servers) => {
            expect(servers).toBeDefined;
        })
        .catch(fail);
});

test("Get server", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return serverClient
        .getServer(1)
        .then((server) => {
            expect(server).toBeDefined;
        })
        .catch(fail);
});

test("Fail getting server by id", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return expect(serverClient.getServer(0)).rejects.toThrowError("Argument `id` cannot be empty");
});

test("Get server by external id", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return serverClient
        .getServerByExternalId("external-id")
        .then((server) => {
            expect(server).toBeDefined;
        })
        .catch(fail);
});

test("Fail getting server by external id", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return expect(serverClient.getServerByExternalId("")).rejects.toThrowError("Argument `externalId` cannot be empty");
});

test("Update server details", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    const serverId = 1;

    return serverClient
        .getServer(serverId)
        .then((server) => {
            const serverName = server.name;
            const newServerName = "New test name";

            let request: ServerDetailsRequest = {
                name: newServerName,
                user: server.user,
                externalId: server.externalId,
                description: server.description
            };

            return serverClient
                .updateDetails(serverId, request)
                .then((server) => {
                    expect(server.name).toBe(newServerName);
                    request.name = serverName;

                    return serverClient
                        .updateDetails(serverId, request)
                        .then((server) => {
                            expect(server.name).toBe(serverName);
                        })
                        .catch(fail);
                })
                .catch(fail);
        })
        .catch(fail);
});

test("Update server build", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    const serverId = 1;

    return serverClient
        .getServer(serverId)
        .then((server) => {
            let request: ServerBuildRequest = {
                allocation: server.allocation,
                cpu: server.limits.cpu,
                disk: server.limits.disk,
                featureLimits: {
                    allocations: server.featureLimits.allocations,
                    backups: server.featureLimits.backups,
                    databases: server.featureLimits.databases
                },
                io: server.limits.io,
                memory: server.limits.memory,
                swap: server.limits.swap,
                threads: server.limits.threads
            };

            return serverClient.updateBuild(serverId, request).catch(fail);
        })
        .catch(fail);
});

test("Update server startup", () => {
    const serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    const serverId = 1;

    return serverClient
        .getServer(serverId)
        .then((server) => {
            const startupCommand = server.container.startupCommand;
            const newStartupCommand = "test command";

            let request: ServerStartupRequest = {
                egg: server.egg,
                environment: server.container.environment,
                image: server.container.image,
                skipScripts: false,
                startup: newStartupCommand
            };

            return serverClient
                .updateStartup(serverId, request)
                .then((server) => {
                    expect(server.container.startupCommand).toBe(newStartupCommand);
                    request.startup = startupCommand;

                    return serverClient
                        .updateStartup(serverId, request)
                        .then((server) => {
                            expect(server.container.startupCommand).toBe(startupCommand);
                        })
                        .catch(fail);
                })
                .catch(fail);
        })
        .catch(fail);
});

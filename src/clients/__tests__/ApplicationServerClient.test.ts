import { ServerDetailsRequest } from "../../models/requests/application/ServerDetailsRequest";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { ApplicationServerClient } from "../sub-clients/ApplicationServerClient";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.APPLICATION_API_KEY };

const TEST_SERVER_ID = process.env.TEST_SERVER_ID as string;

test("Initialize server client", () => {
    let serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    expect(serverClient).toBeDefined();
});

test("Get servers", () => {
    let serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return serverClient
        .getServers()
        .then((servers) => {
            expect(servers).toBeDefined;
        })
        .catch(fail);
});

test("Get server", () => {
    let serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return serverClient
        .getServer(1)
        .then((server) => {
            expect(server).toBeDefined;
        })
        .catch(fail);
});

test("Get server by external id", () => {
    let serverClient: ApplicationServerClient = new ApplicationServerClient(options, credentials);
    return serverClient
        .getServerByExternalId("external-id")
        .then((server) => {
            expect(server).toBeDefined;
        })
        .catch(fail);
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
                user: server.user
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
                .catch((err) => {
                    console.log(err.response.data);
                    fail(err);
                });
        })
        .catch(fail);
});

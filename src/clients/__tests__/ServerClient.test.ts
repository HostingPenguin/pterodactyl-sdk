import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";
import { Client } from "../Client";
import { ServerClient } from "../sub-clients/ServerClient";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.API_KEY };

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

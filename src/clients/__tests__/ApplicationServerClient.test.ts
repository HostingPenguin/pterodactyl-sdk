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

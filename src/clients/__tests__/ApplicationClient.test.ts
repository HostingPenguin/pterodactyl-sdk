import { ApplicationClient } from "../ApplicationClient";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.APPLICATION_API_KEY };

test("Initialize client", () => {
    let client: ApplicationClient = new ApplicationClient(options, credentials);
    expect(client).toBeDefined();
});

test("Get server client", () => {
    let client: ApplicationClient = new ApplicationClient(options, credentials);
    expect(client.servers).toBeDefined();
});

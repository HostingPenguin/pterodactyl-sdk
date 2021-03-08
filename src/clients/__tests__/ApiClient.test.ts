import { ApiClient } from "../ApiClient";
import { Credentials } from "../interfaces/Credentials";
import { Options } from "../interfaces/Options";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.API_KEY };

test("Initialize api client", () => {
    let apiClient: ApiClient = new ApiClient(options, credentials);
    expect(apiClient).toBeDefined();
});

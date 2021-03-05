import { ApiClient } from "../ApiClient";
import { Credentials } from "../../interfaces/Credentials";
import { Options } from "../../interfaces/Options";

test("Initialize api client", () => {
    let options: Options = { baseUrl: "test.test" };
    let credentials: Credentials = {
        apiKey: "TEST_KEY",
    };

    let apiClient: ApiClient = new ApiClient(options, credentials);

    expect(apiClient).toBeDefined();
});

export { Client } from "./clients/Client";
export { ApplicationClient } from "./clients/ApplicationClient";

export { Options } from "./clients/interfaces/Options";
export { Credentials } from "./clients/interfaces/Credentials";

declare module "axios" {
    export interface AxiosRequestConfig {
        crossDomain: boolean;
    }
}

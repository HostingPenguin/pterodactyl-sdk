export interface ServerStartupRequest {
    startup: string;
    environment: Map<string, string>;
    egg: number;
    image: string;
    skipScripts: boolean;
}

export interface ServerStartupRequest {
    startup: string;
    environment: object;
    egg: number;
    image: string;
    skipScripts: boolean;
}

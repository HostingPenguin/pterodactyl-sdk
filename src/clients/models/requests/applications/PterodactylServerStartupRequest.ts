export interface PterodactylServerStartupRequest {
    startup: string;
    environment: object;
    egg: number;
    image: string;
    skip_scripts: boolean;
}

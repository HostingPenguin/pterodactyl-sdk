export interface PterodactylServerStartupRequest {
    startup: string;
    environment: Map<string, string>;
    egg: number;
    image: string;
    skip_scripts: boolean;
}

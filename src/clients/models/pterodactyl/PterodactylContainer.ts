export interface PterodactylContainer {
    startup_command: string;
    image: string;
    installed: boolean;
    environment: Map<string, string>;
}

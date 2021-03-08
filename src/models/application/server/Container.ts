export interface Container {
    startupCommand: string;
    image: string;
    installed: boolean;
    environment: Map<string, string>;
}

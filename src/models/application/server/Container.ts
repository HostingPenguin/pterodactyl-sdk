export interface Container {
    startupCommand: string;
    image: string;
    installed?: boolean;
    environment: object;
}

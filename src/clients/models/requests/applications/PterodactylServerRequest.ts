export interface PterodactylServerRequest {
    name: string;
    user: number;
    egg: number;
    docker_image: string;
    startup: string;
    environment: object;
    limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
        threads?: number;
    };
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    allocation: {
        default: number;
    };
}

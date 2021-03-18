export interface PterodactylServerBuildRequest {
    allocation: number;
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads: number;
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
}

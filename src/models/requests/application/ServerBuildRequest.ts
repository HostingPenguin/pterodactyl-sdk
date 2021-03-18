export interface ServerBuildRequest {
    allocation: number;
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads: number;
    featureLimits: {
        databases: number;
        allocations: number;
        backups: number;
    };
}

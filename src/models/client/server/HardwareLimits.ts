export interface HardwareLimits {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads?: number;
}

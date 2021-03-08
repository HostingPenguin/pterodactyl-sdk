export interface Allocation {
    id: number;
    ip: string;
    ipAlias: string | null;
    port: number;
    notes: string | null;
    isDefault: boolean;
}

import { PterodactylResources } from "./PterodactylResources";

export interface PterodactylStatistics {
    current_state: string;
    is_suspended: boolean;
    resources: PterodactylResources;
}

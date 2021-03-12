import { Resources } from "../../models/client/Resources";
import { Statistics } from "../../models/client/Statistics";
import { PterodactylResources } from "../models/pterodactyl/resources/PterodactylResources";
import { PterodactylStatistics } from "../models/pterodactyl/resources/PterodactylStatistics";
import { PterodactylObject } from "../models/PterodactylObject";

export class StatisticsMapper {
    /**
     * Maps a Pterodactyl resources object to a Resources model.
     * @param obj the object.
     * @returns
     */
    public static mapToResources(object: PterodactylResources): Resources {
        const resources: Resources = {
            memoryBytes: object.memory_bytes,
            cpuAbsolute: object.cpu_absolute,
            diskBytes: object.disk_bytes,
            networkRxBytes: object.network_rx_bytes,
            networkTxBytes: object.network_tx_bytes
        };
        return resources;
    }

    /**
     * Maps a Pterodactyl statistics object to a Statistics model.
     * @param obj the object.
     * @returns
     */
    public static mapToStatistics(object: PterodactylObject<PterodactylStatistics>): Statistics {
        const pterodactylStatistics = object.attributes;
        const statistics: Statistics = {
            currentState: pterodactylStatistics.current_state,
            isSuspended: pterodactylStatistics.is_suspended,
            resources: this.mapToResources(pterodactylStatistics.resources)
        };
        return statistics;
    }
}

import { Allocation } from "../../models/client/server/Allocation";
import { PterodactylAllocation } from "../models/pterodactyl/PterodactylAllocation";
import { PterodactylList } from "../models/PterodactylList";
import { PterodactylObject } from "../models/PterodactylObject";

export class RelationshipMapper {
    /**
     * Maps a Pterodactyl allocation object to a Allocation model.
     * @param object A Pterodactyl allocation object.
     * @returns The Allocation model.
     */
    public static mapToAllocation(object: PterodactylObject<PterodactylAllocation>): Allocation {
        const pterodactylAllocation = object.attributes;
        const allocation: Allocation = {
            id: pterodactylAllocation.id,
            ip: pterodactylAllocation.ip,
            ipAlias: pterodactylAllocation.ip_alias,
            port: pterodactylAllocation.port,
            notes: pterodactylAllocation.notes,
            isDefault: pterodactylAllocation.is_default
        };
        return allocation;
    }

    /**
     * Maps a list of Pterodactyl allocation objects to a list of Allocations.
     * @param objects A list of Pterodactyl allocations objects.
     * @returns List of Allocations models.
     */
    public static mapToAllocations(objects: PterodactylObject<PterodactylAllocation>[]): Allocation[] {
        const allocations: Allocation[] = [];
        for (const pterodactylAllocation of objects) {
            allocations.push(this.mapToAllocation(pterodactylAllocation));
        }
        return allocations;
    }
}

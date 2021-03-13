import { ApplicationServer } from "../../../models/application/server/ApplicationServer";
import { PterodactylApplicationServer } from "../../models/pterodactyl/PterodactylApplicationServer";
import { PterodactylObject } from "../../models/PterodactylObject";
import { RelationshipMapper } from "../RelationshipMapper";
import { ContainerMapper } from "./ContainerMapper";

export class ApplicationServerMapper {
    /**
     * Maps a Pterodactyl server object to a ApplicationServer model.
     * @param object the object.
     * @returns
     */
    public static mapToServer(object: PterodactylObject<PterodactylApplicationServer>): ApplicationServer {
        const pterodactylServer = object.attributes;
        const server: ApplicationServer = {
            serverOwner: pterodactylServer.server_owner,
            identifier: pterodactylServer.identifier,
            internalId: pterodactylServer.internal_id,
            externalId: pterodactylServer.external_id,
            uuid: pterodactylServer.uuid,
            name: pterodactylServer.name,
            node: pterodactylServer.node,
            description: pterodactylServer.description,
            limits: {
                memory: pterodactylServer.limits.memory,
                swap: pterodactylServer.limits.swap,
                disk: pterodactylServer.limits.disk,
                io: pterodactylServer.limits.io,
                cpu: pterodactylServer.limits.cpu
            },
            invocation: pterodactylServer.invocation,
            egg_features: pterodactylServer.egg_features,
            docker_image: pterodactylServer.docker_image,
            featureLimits: {
                databases: pterodactylServer.feature_limits.databases,
                allocations: pterodactylServer.feature_limits.allocations,
                backups: pterodactylServer.feature_limits.backups
            },
            user: pterodactylServer.user,
            allocation: pterodactylServer.allocation,
            nest: pterodactylServer.nest,
            egg: pterodactylServer.egg,
            pack: pterodactylServer.pack,
            container: ContainerMapper.mapToContainer(pterodactylServer.container),
            isSuspended: pterodactylServer.is_suspended,
            isInstalling: pterodactylServer.is_installing,
            isTransferring: pterodactylServer.is_transferring,
            updatedAt: new Date(pterodactylServer.updated_at),
            createdAt: new Date(pterodactylServer.created_at),
            relationships: {
                allocations: RelationshipMapper.mapToAllocations(pterodactylServer.relationships?.allocations.data),
                variables: null
            }
        };

        return server;
    }

    /**
     * Maps a list of Pterodactyl server objects to a list of ApplicationServer models.
     * @param objects a list of objects.
     * @returns
     */
    public static mapToServers(objects: PterodactylObject<PterodactylApplicationServer>[]): ApplicationServer[] {
        const servers: ApplicationServer[] = [];
        for (const pterodactylServer of objects) {
            servers.push(this.mapToServer(pterodactylServer));
        }
        return servers;
    }
}

import { FeatureLimits } from "../../models/client/server/FeatureLimits";
import { FtpDetails } from "../../models/client/server/FtpDetails";
import { HardwareLimits } from "../../models/client/server/HardwareLimits";
import { Server } from "../../models/client/server/Server";
import { PterodactylServer } from "../models/pterodactyl/PterodactylServer";
import { PterodactylObject } from "../models/PterodactylObject";
import { RelationshipMapper } from "./RelationshipMapper";

export class ServerMapper {
    /**
     * Maps a Pterodactyl server object to a Server model.
     * @param obj the object.
     * @returns
     */
    public static mapToServer(object: PterodactylObject<PterodactylServer>): Server {
        const pterodactylServer = object.attributes;
        const server: Server = {
            serverOwner: pterodactylServer.server_owner,
            identifier: pterodactylServer.identifier,
            internalId: pterodactylServer.internal_id,
            uuid: pterodactylServer.uuid,
            name: pterodactylServer.name,
            node: pterodactylServer.node,
            sftpDetails: {
                ip: pterodactylServer.sftp_details.ip,
                port: pterodactylServer.sftp_details.port
            },
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
            isSuspended: pterodactylServer.is_suspended,
            isInstalling: pterodactylServer.is_installing,
            isTransferring: pterodactylServer.is_transferring,
            relationships: {
                allocations: RelationshipMapper.mapToAllocations(pterodactylServer.relationships.allocations.data),
                variables: null
            }
        };

        return server;
    }

    /**
     * Maps a list of Pterodactyl server objects to a list of Server models.
     * @param objects a list of objects.
     * @returns
     */
    public static mapToServers(objects: PterodactylObject<PterodactylServer>[]): Server[] {
        const servers: Server[] = [];
        for (const pterodactylServer of objects) {
            servers.push(this.mapToServer(pterodactylServer));
        }
        return servers;
    }
}

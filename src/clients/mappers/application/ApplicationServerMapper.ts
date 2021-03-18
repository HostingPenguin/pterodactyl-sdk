import { ApplicationServer } from "../../../models/application/server/ApplicationServer";
import { ServerBuildRequest } from "../../../models/requests/application/ServerBuildRequest";
import { ServerDetailsRequest } from "../../../models/requests/application/ServerDetailsRequest";
import { ServerStartupRequest } from "../../../models/requests/application/ServerStartupRequest";
import { PterodactylApplicationServer } from "../../models/pterodactyl/PterodactylApplicationServer";
import { PterodactylObject } from "../../models/PterodactylObject";
import { PterodactylServerBuildRequest } from "../../models/requests/applications/PterodactylServerBuildRequest";
import { PterodactylServerDetailsRequest } from "../../models/requests/applications/PterodactylServerDetailsRequest";
import { PterodactylServerStartupRequest } from "../../models/requests/applications/PterodactylServerStartupRequest";
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

    /**
     * Maps the ServerDetailsRequest to the PterodactylServerDetailsRequest.
     * @param {ServerDetailsRequest} object The request object.
     * @returns {PterodactylServerDetailsRequest} The mapped object.
     */
    public static mapToPterodactylServerDetailsRequest(object: ServerDetailsRequest): PterodactylServerDetailsRequest {
        const request: PterodactylServerDetailsRequest = {
            name: object.name,
            user: object.user,
            external_id: object.externalId,
            description: object.description
        };
        return request;
    }

    /**
     * Maps the ServerBuildRequest to the PterodactylServerBuildRequest.
     * @param {ServerBuildRequest} object The request object.
     * @returns {PterodactylServerBuildRequest} The mapped object.
     */
    public static mapToPterodactylServerBuildRequest(object: ServerBuildRequest): PterodactylServerBuildRequest {
        const request: PterodactylServerBuildRequest = {
            allocation: object.allocation,
            memory: object.memory,
            swap: object.swap,
            disk: object.disk,
            io: object.io,
            cpu: object.cpu,
            threads: object.threads,
            feature_limits: {
                databases: object.featureLimits?.databases,
                allocations: object.featureLimits?.allocations,
                backups: object.featureLimits?.backups
            }
        };
        return request;
    }

    /**
     * Maps the ServerStartupRequest to the PterodactylServerStartupRequest.
     * @param {ServerStartupRequest} object The request object.
     * @returns {PterodactylServerStartupRequest} The mapped object.
     */
    public static mapToPterodactylServerStartupRequest(object: ServerStartupRequest): PterodactylServerStartupRequest {
        const request: PterodactylServerStartupRequest = {
            startup: object.startup,
            environment: object.environment,
            egg: object.egg,
            image: object.image,
            skip_scripts: object.skipScripts
        };
        return request;
    }
}

import { ApplicationServer } from "../../../models/application/server/ApplicationServer";
import { ServerBuildRequest } from "../../../models/requests/application/ServerBuildRequest";
import { ServerDetailsRequest } from "../../../models/requests/application/ServerDetailsRequest";
import { ServerStartupRequest } from "../../../models/requests/application/ServerStartupRequest";
import { ServerRequest } from "../../../models/requests/application/ServerRequest";
import { PterodactylApplicationServer } from "../../models/pterodactyl/PterodactylApplicationServer";
import { PterodactylObject } from "../../models/PterodactylObject";
import { PterodactylServerBuildRequest } from "../../models/requests/applications/PterodactylServerBuildRequest";
import { PterodactylServerDetailsRequest } from "../../models/requests/applications/PterodactylServerDetailsRequest";
import { PterodactylServerStartupRequest } from "../../models/requests/applications/PterodactylServerStartupRequest";
import { RelationshipMapper } from "../RelationshipMapper";
import { ContainerMapper } from "./ContainerMapper";
import { PterodactylServerRequest } from "../../models/requests/applications/PterodactylServerRequest";

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
                cpu: pterodactylServer.limits.cpu,
                threads: pterodactylServer.limits.threads
            },
            invocation: pterodactylServer.invocation,
            eggFeatures: pterodactylServer.egg_features,
            dockerImage: pterodactylServer.docker_image,
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
            updatedAt: new Date(pterodactylServer.updated_at ?? ""),
            createdAt: new Date(pterodactylServer.created_at ?? ""),
            relationships: {
                allocations: RelationshipMapper.mapToAllocations(pterodactylServer.relationships?.allocations.data),
                variables: null
            }
        };

        return server;
    }

    /**
     * Maps a ApplicationServer model to a Pterodactyl server object model.
     * @param object the object.
     * @returns
     */
    public static mapToPterodactylServer(object: ApplicationServer): PterodactylApplicationServer {
        const server: PterodactylApplicationServer = {
            server_owner: object.serverOwner,
            external_id: object.externalId,
            name: object.name,
            node: object.node,
            description: object.description,
            limits: {
                memory: object.limits.memory,
                swap: object.limits.swap,
                disk: object.limits.disk,
                io: object.limits.io,
                cpu: object.limits.cpu,
                threads: object.limits.threads
            },
            invocation: object.invocation,
            docker_image: object.dockerImage,
            feature_limits: {
                databases: object.featureLimits.databases,
                allocations: object.featureLimits.allocations,
                backups: object.featureLimits.backups
            },
            user: object.user,
            allocation: object.allocation,
            nest: object.nest,
            egg: object.egg,
            pack: object.pack,
            container: ContainerMapper.mapToPterodactylContainer(object.container)
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
            user: object.user
        };

        if (object.externalId) request.external_id = object.externalId;
        if (object.description) request.description = object.description;

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

    /**
     * Maps the ServerRequest to the PterodactylServerRequest.
     * @param {ServerRequest} object The request object.
     * @returns {PterodactylServerRequest} The mapped object.
     */
    public static mapToPterodactylServerRequest(object: ServerRequest): PterodactylServerRequest {
        const request: PterodactylServerRequest = {
            allocation: {
                default: object.allocation?.default
            },
            docker_image: object.dockerImage,
            egg: object.egg,
            environment: object.environment,
            feature_limits: {
                allocations: object.featureLimits?.allocations,
                backups: object.featureLimits?.backups,
                databases: object.featureLimits?.databases
            },
            limits: {
                cpu: object.limits?.cpu,
                disk: object.limits?.disk,
                io: object.limits?.io,
                memory: object.limits?.memory,
                swap: object.limits?.swap,
                threads: object.limits?.threads
            },
            name: object.name,
            startup: object.startup,
            user: object.user
        };
        return request;
    }
}

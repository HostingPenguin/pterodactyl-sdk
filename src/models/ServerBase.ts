import { FeatureLimits } from "./client/server/FeatureLimits";
import { HardwareLimits } from "./client/server/HardwareLimits";
import { Relationships } from "./client/server/Relationships";

export interface ServerBase {
    serverOwner: boolean;
    identifier: string;
    internalId: number;
    uuid: string;
    name: string;
    description: string;
    limits: HardwareLimits;
    invocation: string;
    docker_image: string;
    egg_features: null;
    featureLimits: FeatureLimits;
    isSuspended: boolean;
    isInstalling: boolean;
    isTransferring: boolean;
    relationships: Relationships | undefined;
}

import { FeatureLimits } from "./FeatureLimits";
import { FtpDetails } from "./FtpDetails";
import { HardwareLimits } from "./HardwareLimits";
import { Relationships } from "./Relationships";

export interface Server {
    serverOwner: boolean;
    identifier: string;
    internalId: number;
    uuid: string;
    name: string;
    node: string;
    sftpDetails: FtpDetails;
    description: string;
    limits: HardwareLimits;
    invocation: string;
    docker_image: string;
    egg_features: null;
    featureLimits: FeatureLimits;
    isSuspended: boolean;
    isInstalling: boolean;
    isTransferring: boolean;
    relationships: Relationships;
}

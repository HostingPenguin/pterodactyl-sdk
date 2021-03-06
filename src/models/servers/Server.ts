import { FeatureLimits } from "./FeatureLimits";
import { FtpDetails } from "./FtpDetails";
import { HardwareLimits } from "./HardwareLimits";
import { Relations } from "./Relations";

export class Server {
    public serverOwner: boolean;
    public identifier: string;
    public internalId: number;
    public uuid: string;
    public name: string;
    public node: string;
    public sftpDetails: FtpDetails;
    public description: string;
    public limits: HardwareLimits;
    public invocation: string;
    public dockerImage: string;
    public eggFeatures: string;
    public featureLimits: FeatureLimits;
    public isSuspended: boolean;
    public isInstalling: boolean;
    public isTransferring: boolean;
    public relationships: Relations;
}

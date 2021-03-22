import { FeatureLimits } from "../../client/server/FeatureLimits";
import { HardwareLimits } from "../../client/server/HardwareLimits";

export interface ServerRequest {
    name: string;
    user: number;
    egg: number;
    dockerImage: string;
    startup: string;
    environment: object;
    limits: HardwareLimits;
    featureLimits: FeatureLimits;
    allocation: {
        default: number;
    };
}

import { JsonAlias, JsonClassType, JsonProperty } from "jackson-js";
import { FeatureLimits } from "./FeatureLimits";
import { FtpDetails } from "./FtpDetails";
import { HardwareLimits } from "./HardwareLimits";
import { Relations } from "./Relations";

export class Server {
    @JsonProperty()
    @JsonClassType({ type: () => [Boolean] })
    @JsonAlias({ values: ["server_owner"] })
    public serverOwner: boolean;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public identifier: string;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    @JsonAlias({ values: ["internal_id"] })
    public internalId: number;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public uuid: string;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public name: string;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public node: string;

    @JsonProperty()
    @JsonClassType({ type: () => [FtpDetails] })
    @JsonAlias({ values: ["sftp_details"] })
    public sftpDetails: FtpDetails;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public description: string;

    @JsonProperty()
    @JsonClassType({ type: () => [HardwareLimits] })
    public limits: HardwareLimits;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public invocation: string;

    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    @JsonAlias({ values: ["docker_image"] })
    public dockerImage: string;

    @JsonProperty()
    @JsonClassType({ type: () => [Array, [String]] })
    @JsonAlias({ values: ["egg_features"] })
    public eggFeatures: string;

    @JsonProperty()
    @JsonClassType({ type: () => [FeatureLimits] })
    @JsonAlias({ values: ["feature_limits"] })
    public featureLimits: FeatureLimits;

    @JsonProperty()
    @JsonClassType({ type: () => [Boolean] })
    @JsonAlias({ values: ["is_suspended"] })
    public isSuspended: boolean;

    @JsonProperty()
    @JsonClassType({ type: () => [Boolean] })
    @JsonAlias({ values: ["is_installing"] })
    public isInstalling: boolean;

    @JsonProperty()
    @JsonClassType({ type: () => [Boolean] })
    @JsonAlias({ values: ["is_transferring"] })
    public isTransferring: boolean;

    @JsonProperty()
    @JsonClassType({ type: () => [Relations] })
    public relationships: Relations;
}

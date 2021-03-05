import { JsonClassType, JsonProperty } from "jackson-js";

export class FeatureLimits {
    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public databases: number;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public allocations: number;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public backups: number;
}

import { JsonClassType, JsonProperty } from "jackson-js";

export class HardwareLimits {
    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public memory: number;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public swap: number;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public disk: number;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public io: number;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public cpu: number;
}

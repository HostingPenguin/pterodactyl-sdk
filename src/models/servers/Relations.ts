import { JsonClassType, JsonProperty } from "jackson-js";

export class Relations {
    @JsonProperty()
    @JsonClassType({ type: () => [Object] })
    public allocations: any;

    @JsonProperty()
    @JsonClassType({ type: () => [Object] })
    public variables: any;
}

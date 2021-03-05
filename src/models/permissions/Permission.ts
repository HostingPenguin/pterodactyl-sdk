import { JsonClassType, JsonProperty } from "jackson-js";

export class Permission {
    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public description: string;

    @JsonProperty()
    @JsonClassType({ type: () => [Map, [String, String]] })
    public keys: Map<string, string>;
}

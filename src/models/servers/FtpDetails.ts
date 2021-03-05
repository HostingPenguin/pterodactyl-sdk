import { JsonClassType, JsonProperty } from "jackson-js";

export class FtpDetails {
    @JsonProperty()
    @JsonClassType({ type: () => [String] })
    public ip: string;

    @JsonProperty()
    @JsonClassType({ type: () => [Number] })
    public port: number;
}

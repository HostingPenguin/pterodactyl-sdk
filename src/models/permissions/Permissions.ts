import { JsonClassType, JsonProperty } from "jackson-js";
import { Permission } from "./Permission";

export class Permissions {
    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public websocket: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public control: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public user: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public file: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public backup: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public allocation: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public startup: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public database: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public schedule: Permission;

    @JsonProperty()
    @JsonClassType({ type: () => [Permission] })
    public settings: Permission;
}

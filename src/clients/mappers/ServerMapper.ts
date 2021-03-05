import { ObjectMapper } from "jackson-js";
import { Server } from "../../models/servers/Server";

export class ServerMapper {
    private static mapper = new ObjectMapper();

    /**
     * Maps a server object to a Server model.
     * @param obj the object.
     * @returns
     */
    public static mapToServer(object: any): Server {
        return this.mapper.parse<Server>(JSON.stringify(object));
    }

    /**
     * Maps a list of server objects to a list of Server models.
     * @param objects a list of objects.
     * @returns
     */
    public static mapToServers(objects: any[]): Server[] {
        return this.mapper.parse<Server[]>(JSON.stringify(objects), {
            mainCreator: () => [Array, [Server]],
        });
    }
}

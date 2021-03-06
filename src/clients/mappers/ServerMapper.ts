import { Server } from "../../models/servers/Server";
import { PterodactylServer } from "../models/pterodactyl/PterodactylServer";
import { PterodactylObject } from "../models/PterodactylObject";

export class ServerMapper {
    /**
     * Maps a Pterodactyl server object to a Server model.
     * @param obj the object.
     * @returns
     */
    public static mapToServer(object: PterodactylObject<PterodactylServer>): Server {
        let server = new Server();
        return;
    }

    /**
     * Maps a list of Pterodactyl server objects to a list of Server models.
     * @param objects a list of objects.
     * @returns
     */
    public static mapToServers(objects: PterodactylObject<PterodactylServer>[]): Server[] {
        return [];
    }
}

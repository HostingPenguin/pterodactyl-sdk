import { Websocket } from "../../../models/client/Websocket";
import { PterodactylWebsocket } from "../../models/pterodactyl/PterodactylWebsocket";
import { PterodactylData } from "../../models/PterodactylData";

export class WebsocketMapper {
    /**
     * Maps a Pterodactyl websocket object to a Websocket model.
     * @param obj the object.
     * @returns
     */
    public static mapToWebsocket(object: PterodactylData<PterodactylWebsocket>): Websocket {
        const pterodactylWebsocket = object.data;
        const websocket: Websocket = {
            token: pterodactylWebsocket.token,
            socket: pterodactylWebsocket.socket
        };
        return websocket;
    }
}

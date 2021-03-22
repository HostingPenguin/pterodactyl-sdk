import { Container } from "../../../models/application/server/Container";
import { PterodactylContainer } from "../../models/pterodactyl/PterodactylContainer";

export class ContainerMapper {
    /**
     * Maps a Pterodactyl container object to a Container model.
     * @param object the object.
     * @returns
     */
    public static mapToContainer(object: PterodactylContainer): Container {
        const container: Container = {
            startupCommand: object.startup_command,
            image: object.image,
            installed: object.installed,
            environment: object.environment
        };
        return container;
    }

    /**
     * Maps a Container model to a Pterodactyl container object.
     * @param object the object.
     * @returns
     */
    public static mapToPterodactylContainer(object: Container): PterodactylContainer {
        const container: PterodactylContainer = {
            startup_command: object.startupCommand,
            image: object.image,
            environment: object.environment
        };
        return container;
    }
}

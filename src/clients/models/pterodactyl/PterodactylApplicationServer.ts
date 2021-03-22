import { PterodactylContainer } from "./PterodactylContainer";
import { PterodactylServer } from "./PterodactylServer";
import { PterodactylServerBase } from "./PterodactylServerBase";

export interface PterodactylApplicationServer extends PterodactylServerBase {
    external_id: string;
    user: number;
    node: number;
    allocation: number;
    nest: number;
    egg: number;
    pack: number | null;
    container: PterodactylContainer;
    updated_at?: string;
    created_at?: string;
}

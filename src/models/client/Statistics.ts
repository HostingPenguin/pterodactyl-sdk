import { Resources } from "./Resources";

export interface Statistics {
    currentState: string;
    isSuspended: boolean;
    resources: Resources;
}

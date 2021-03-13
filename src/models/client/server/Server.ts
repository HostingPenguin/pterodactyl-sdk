import { ServerBase } from "../../ServerBase";
import { FtpDetails } from "./FtpDetails";

export interface Server extends ServerBase {
    node: string;
    sftpDetails: FtpDetails;
}

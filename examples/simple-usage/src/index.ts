import { Client, Credentials, Options } from "@hostingpengu.in/pterodactyl-sdk";

require("dotenv").config();

const TEST_SERVER_ID = process.env.TEST_SERVER_ID ?? "";

const options: Options = { baseUrl: process.env.BASE_URL };
const credentials: Credentials = { apiKey: process.env.CLIENT_API_KEY };

const client = new Client(options, credentials);
client.servers.getConsoleDetails(TEST_SERVER_ID).then((details) => {
    console.table(details);
});

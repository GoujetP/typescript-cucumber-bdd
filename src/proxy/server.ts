import { createServer } from "node:https";
import { handleRequest } from "./proxy";

export const server = createServer(handleRequest);

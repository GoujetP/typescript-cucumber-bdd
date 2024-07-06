import type { IncomingMessage, ServerResponse } from "node:http";
import { parse } from "node:url";
import { makeHttpsRequest } from "../core.ts";
import { stringify } from "node:querystring";

export const handleRequest = async (
	req: IncomingMessage,
	res: ServerResponse,
) => {
	try {
		const url = req.url ?? "/";
		const { pathname, query } = parse(url, true);
		const queryString =
			Object.keys(query).length > 0 ? `?${stringify(query)}` : "";
		const apiUrl = `https://swapi.dev/api${pathname}${queryString}`;

		const data = await makeHttpsRequest(apiUrl);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
	} catch (error) {
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: errorMessage }));
	}
};

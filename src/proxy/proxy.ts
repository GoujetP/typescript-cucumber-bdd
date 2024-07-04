import type { IncomingMessage, ServerResponse } from "node:http";
import { parse } from "node:url";
import { makeHttpsRequest } from "../core";
import { stringify } from "node:querystring";

export const handleRequest = async (
	req: IncomingMessage,
	res: ServerResponse,
) => {
	try {
		const { pathname, query } = parse(req.url, true);
		const queryString =
			Object.keys(query).length > 0 ? `?${stringify(query)}` : "";
		const apiUrl = `https://swapi.dev/api${pathname}${queryString}`;

		const data = await makeHttpsRequest(apiUrl);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
	} catch (error) {
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: error.message }));
	}
};

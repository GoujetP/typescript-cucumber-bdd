import { Given, When, Then } from "@cucumber/cucumber";
import { handleRequest } from "../../src/proxy/proxy.ts";
import { strict as assert } from "node:assert";
import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";

interface CharacterDetails {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: string[];
	starships: string[];
	created: string;
	edited: string;
	url: string;
}

let proxyResponse: CharacterDetails;

Given("I have the endpoint {string}", function (endpoint: string) {
	this.endpoint = endpoint;
});

When("I make a request through the proxy", async function () {
	const mockSocket = new Socket();
	const mockReq = new IncomingMessage(mockSocket);
	mockReq.url = this.endpoint;
	const mockRes = new ServerResponse(mockReq) as ServerResponse & {
		end: (
			chunk?: string | Buffer | (() => void),
			encoding?: BufferEncoding | (() => void),
			cb?: () => void,
		) => ServerResponse;
	};

	// Override the end method to capture the response
	const originalEnd = mockRes.end;

	// Cast the modified end method to the correct type
	(mockRes.end as unknown) = function (
		this: ServerResponse,
		chunk?: string | Buffer | (() => void),
		encoding?: BufferEncoding | (() => void),
		cb?: () => void,
	): ServerResponse {
		let modifiedChunk = chunk;
		let modifiedEncoding = encoding;
		let modifiedCb = cb;

		if (typeof modifiedChunk === "string" || Buffer.isBuffer(modifiedChunk)) {
			proxyResponse = JSON.parse(modifiedChunk.toString());
			if (typeof modifiedEncoding === "function") {
				modifiedCb = modifiedEncoding;
				modifiedEncoding = undefined;
			}
		} else if (typeof modifiedChunk === "function") {
			modifiedCb = modifiedChunk;
			modifiedChunk = undefined;
		}

		const args = [modifiedChunk, modifiedEncoding, modifiedCb].filter(
			(arg) => arg !== undefined,
		);

		// Apply the original end method with the current context and filtered arguments
		return originalEnd.apply(
			this,
			args as [
				string | Buffer | undefined,
				BufferEncoding | undefined,
				(() => void) | undefined,
			],
		);
	} as typeof mockRes.end;

	await handleRequest(mockReq, mockRes);
});

Then("I should receive the character's details", () => {
	assert.ok(proxyResponse.name);
	assert.ok(proxyResponse.height);
	assert.ok(proxyResponse.mass);
});

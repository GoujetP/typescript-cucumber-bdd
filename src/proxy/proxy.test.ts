import { describe, it, expect, vi } from "vitest";
import { type IncomingMessage, ServerResponse } from "node:http";
import { handleRequest } from "./proxy";
import { Readable } from "node:stream";
import { makeHttpsRequest } from "../core";

vi.mock("../core", () => ({
	makeHttpsRequest: vi.fn((url: string) =>
		Promise.resolve(
			url === "https://swapi.dev/api/people/1/"
				? { name: "Luke Skywalker" }
				: null,
		),
	),
}));

describe("Proxy Server", () => {
	it("should proxy requests and return expected data", async () => {
		// Arrange
		const mockReq = new Readable() as IncomingMessage;
		mockReq.url = "/people/1/";
		const mockRes = new ServerResponse(mockReq);
		const writeHeadSpy = vi.spyOn(mockRes, "writeHead");
		const endSpy = vi.spyOn(mockRes, "end");

		// Act
		await handleRequest(mockReq, mockRes);

		// Assert
		expect(writeHeadSpy).toHaveBeenCalledWith(200, {
			"Content-Type": "application/json",
		});
		expect(endSpy).toHaveBeenCalledWith(
			JSON.stringify({ name: "Luke Skywalker" }),
		);
	});

	it("should handle errors by responding with status 500", async () => {
		// Arrange
		const mockReq = new Readable() as IncomingMessage;
		mockReq.url = "/invalid/path";
		const mockRes = new ServerResponse(mockReq);
		const writeHeadSpy = vi.spyOn(mockRes, "writeHead");
		const endSpy = vi.spyOn(mockRes, "end");
		vi.mocked(makeHttpsRequest).mockRejectedValueOnce(
			new Error("Failed to fetch data"),
		);

		// Act
		await handleRequest(mockReq, mockRes);

		// Assert
		expect(writeHeadSpy).toHaveBeenCalledWith(500, {
			"Content-Type": "application/json",
		});
		expect(endSpy).toHaveBeenCalledWith(
			JSON.stringify({ error: "Failed to fetch data" }),
		);
	});
});

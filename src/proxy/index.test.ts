import { describe, it, expect, vi } from "vitest";
import { handleRequest } from "./proxy";
import { Readable } from "node:stream";
import { IncomingMessage, ServerResponse } from "node:http";

vi.mock("./proxy", () => ({
	handleRequest: vi.fn().mockImplementation((req, res) => {
		return new Promise<void>((resolve) => {
			// Simulate handling a request
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "This is a mock response" }));
			resolve();
		});
	}),
}));

describe("handleRequest function", () => {
	it("should call writeHead with correct status and headers", async () => {
		// Arrange
		const mockReq = new Readable() as IncomingMessage;
		mockReq.url = "/test/path"; // Mock URL for consistency
		const mockRes = new ServerResponse(mockReq);
		const writeHeadSpy = vi.spyOn(mockRes, "writeHead");

		// Act
		await handleRequest(mockReq, mockRes);

		// Assert
		expect(writeHeadSpy).toHaveBeenCalledWith(200, {
			"Content-Type": "application/json",
		});
	});

	it("should call end with correct response body", async () => {
		// Arrange
		const mockReq = new Readable() as IncomingMessage;
		mockReq.url = "/test/path";
		const mockRes = new ServerResponse(mockReq);
		const endSpy = vi.spyOn(mockRes, "end");

		// Act
		await handleRequest(mockReq, mockRes);

		// Assert
		expect(endSpy).toHaveBeenCalledWith(
			JSON.stringify({ message: "This is a mock response" }),
		);
	});
});

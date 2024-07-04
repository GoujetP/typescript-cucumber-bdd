import { describe, it, expect, vi } from "vitest";
import { IncomingMessage, ServerResponse } from "node:http";
import { handleRequest } from "./proxy";
import { server } from "./server";

vi.mock("./proxy", () => ({
	handleRequest: vi
		.fn()
		.mockImplementation((req: IncomingMessage, res: ServerResponse) => {
			return new Promise<void>((resolve, reject) => {
				try {
					res.setHeader("Content-Type", "application/json");
					res.writeHead(200);
					res.end(JSON.stringify({ message: "This is a mock response" }));
					process.nextTick(() => res.emit("finish")); // Ensure 'finish' is emitted asynchronously
					resolve();
				} catch (error) {
					reject(new Error(error));
				}
			});
		}),
}));

describe("server", () => {
	it("should create a server that calls the mocked handleRequest successfully", async () => {
		// Arrange
		const mockReq = new IncomingMessage(null);
		mockReq.url = "/test/path";
		const mockRes = new ServerResponse(mockReq);

		// Act
		await new Promise<void>((resolve) => {
			mockRes.on("finish", () => {
				// Assert
				expect(vi.isMockFunction(handleRequest)).toBeTruthy();
				expect(handleRequest).toHaveBeenCalled();
				expect(mockRes.statusCode).toBe(200);
				expect(mockRes.getHeader("Content-Type")).toBe("application/json");
				resolve();
			});

			server.emit("request", mockReq, mockRes);
		});
	});

	it("should handle errors gracefully when handleRequest fails", async () => {
		// Arrange
		const mockReq = new IncomingMessage(null);
		mockReq.url = "/test/path";
		const mockRes = new ServerResponse(mockReq);

		vi.mocked(handleRequest).mockImplementationOnce(
			(req: IncomingMessage, res: ServerResponse) => {
				return new Promise<void>((resolve, reject) => {
					res.writeHead(500); // Simulate server error
					res.end("Internal Server Error");
					process.nextTick(() => res.emit("finish")); // Ensure 'finish' is emitted asynchronously
					resolve();
				});
			},
		);

		// Act & Assert
		await new Promise<void>((resolve) => {
			mockRes.on("finish", () => {
				expect(vi.isMockFunction(handleRequest)).toBeTruthy();
				expect(handleRequest).toHaveBeenCalled();
				expect(mockRes.statusCode).toBe(500);
				resolve();
			});

			server.emit("request", mockReq, mockRes);
		});
	});
});

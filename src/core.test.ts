import { describe, it, expect, vi } from "vitest";
import { get } from "node:https";
import { makeHttpsRequest } from "./core";
import { ClientRequest, IncomingMessage } from "node:http";
import EventEmitter from "node:events";

interface MockResponse {
	on: (event: string, handler: (chunk?: string | Error) => void) => void;
}

vi.mock("node:https", () => ({
	get: vi.fn((url: string, callback: (res: MockResponse) => void) => {
		const res: MockResponse = {
			on: (event: string, handler: (chunk?: string | Error) => void) => {
				if (event === "data") {
					handler(JSON.stringify({ success: true }));
				}
				if (event === "end") {
					handler();
				}
			},
		};
		callback(res);
		return { on: vi.fn() };
	}),
}));

describe("makeHttpsRequest", () => {
	it("should return parsed JSON data for a successful request", async () => {
		const data = await makeHttpsRequest<{ success: boolean }>(
			"https://example.com",
		);
		expect(data).toEqual({ success: true });
		expect(get).toHaveBeenCalled();
	});

	it("should handle request errors", async () => {
		vi.mocked(get).mockImplementationOnce((url, callback) => {
			const errorEventEmitter = new EventEmitter();
			process.nextTick(() =>
				errorEventEmitter.emit("error", new Error("Network error")),
			);
			return errorEventEmitter as unknown as ClientRequest;
		});

		await expect(
			makeHttpsRequest<{ success: boolean }>("https://example.com"),
		).rejects.toThrow("Network error");
	});
});

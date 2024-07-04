import { createInterface } from "node:readline";
import { get } from "node:https";

export const sayHello = () => "hello";
export const add = (a: number, b: number) => a + b;

// HTTPS request function with prettified JSON output
// In index.ts
export const makeHttpsRequest = (url: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		get(url, (res) => {
			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				try {
					const parsedData = JSON.parse(data);
					resolve(parsedData); // Resolve the promise with the parsed data
				} catch (error) {
					reject(new Error(`Error parsing JSON: ${error}`));
				}
			});
		}).on("error", (err) => {
			reject(new Error(`Error: ${err.message}`));
		});
	});
};

import { get } from "node:https";

export const sayHello = () => "hello";
export const add = (a: number, b: number) => a + b;

export const makeHttpsRequest = <T>(url: string): Promise<T> =>
	new Promise((resolve, reject) => {
		get(url, (res) => {
			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				try {
					const parsedData: T = JSON.parse(data);
					resolve(parsedData);
				} catch (error) {
					reject(new Error(`Error parsing JSON: ${error}`));
				}
			});
		}).on("error", (err) => {
			reject(new Error(`Error: ${err.message}`));
		});
	});

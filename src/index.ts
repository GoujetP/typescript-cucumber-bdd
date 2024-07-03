import { createInterface } from "node:readline";
import { add, makeHttpsRequest } from "./core";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const menu = () => {
	return "1: Get Star Wars character\n2: Add two numbers\nChoose an option: ";
};

rl.question(menu(), (choice) => {
	switch (choice) {
		case "1":
			rl.question(
				"Enter a Star Wars character ID (e.g., 1 for Luke Skywalker): ",
				(id) => {
					const url = `https://swapi.dev/api/people/${id}/`;
					makeHttpsRequest(url)
						.then((data) => {
							console.log("Character data:", data);
							rl.close();
						})
						.catch((error) => {
							console.error("Request failed:", error);
							rl.close();
						});
				},
			);
			break;
		case "2":
			rl.question("Enter the first number: ", (num1) => {
				rl.question("Enter the second number: ", (num2) => {
					console.log(`The sum is: ${add(parseInt(num1), parseInt(num2))}`);
					rl.close();
				});
			});
			break;
		default:
			console.log("Invalid choice.");
			rl.close();
			break;
	}
});

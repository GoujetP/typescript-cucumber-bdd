import { createInterface } from "node:readline";

// Existing functions
export const sayHello = () => "hello";
export const add = (a: number, b: number) => a + b;

// New functionality to interact with the user and use the add function
const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Enter the first number: ", (firstNum) => {
	rl.question("Enter the second number: ", (secondNum) => {
		const result = add(Number.parseInt(firstNum), Number.parseInt(secondNum));
		console.log(
			`The result of adding ${firstNum} and ${secondNum} is ${result}`,
		);
		rl.close();
	});
});

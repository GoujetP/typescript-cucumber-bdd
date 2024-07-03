# typescript-cucumber-bdd 

How to implement Behavior-Driven Development (BDD) using Cucumber with TypeScript. 

## Technologies Used

- 🥒 Cucumber: For BDD testing, allowing the definition of application behavior in plain language.
- 🛠 TypeScript: A superset of JavaScript that adds static types.
- 🚀 Bun: A fast, modern runtime for JavaScript and TypeScript, used here for dependency management and script execution.

## Getting Started

### Install Dependencies

To install the project dependencies, run:

```bash
bun install
```

### Running Tests

To run the tests, run :

```bash
bun run test
```

### Running the Application

To interact with the application, run:

```bash
bun run start
```

## Example: Adding Two Numbers

After running the `start` command, you will be prompted to enter two numbers. For example:

```
$ bun run start 
Enter the first number: 1
Enter the second number: 2
The result of adding 1 and 2 is 3
```

### Feature

The feature file `add.feature` describes the behavior we expect from our add function:

```feature
Feature: Add function
	Scenario: Adding two numbers
		Given I have a number 5
		And I have another number 3
		When I add them
		Then I get 8
```


### Code

The `add` function in `index.ts` performs the addition and interacts with the user:

```typescript
import * as readline from 'readline';

export const sayHello = () => "hello";
export const add = (a: number, b: number) => a + b;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the first number: ', (firstNum) => {
  rl.question('Enter the second number: ', (secondNum) => {
    const result = add(parseInt(firstNum), parseInt(secondNum));
    console.log(`The result of adding ${firstNum} and ${secondNum} is ${result}`);
    rl.close();
  });
});
```


### Steps

The step definitions in `add.steps.ts` bind the steps in the feature file to the actual code:

```ts
import { equal } from "node:assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { add } from "../../src/index.ts";

Given("I have a number {int}", function (number: number) {
	this.a = number;
});

Given("I have another number {int}", function (number: number) {
	this.b = number;
});

When("I add them", function () {
	this.result = add(this.a, this.b);
});

Then("I get {int}", function (expectedResult: number) {
	equal(this.result, expectedResult);
});
```
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

## Examples

### Adding Two Numbers

After running the `start` command, you will be prompted to enter two numbers. For example:

```
$ bun run start 
Enter the first number: 1
Enter the second number: 2
The sum is: 3
```

### Getting a Star Wars Character

After running the `start` command, you can also choose to get a Star Wars character by ID. For example:

```
$ bun run start
Choose an option: 1
Enter a Star Wars character ID (e.g., 1 for Luke Skywalker): 1
```

The application will then make an HTTPS request and print the details of the character.

### Feature: Adding Two Numbers

The feature file `add.feature` describes the behavior we expect from our add function:

```feature
Feature: Add function
	Scenario: Adding two numbers
		Given I have a number 5
		And I have another number 3
		When I add them
		Then I get 8
```
### Steps for Adding Two Numbers

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

### Feature: Getting a Star Wars Character
The feature file starwars.feature outlines the steps to retrieve a Star Wars character by ID:

```feature
Feature: Get Star Wars character
	Scenario: Getting a character by ID
		Given I have the character ID 1
		When I retrieve the character
		Then I should see the character's details
```
### Steps for Getting a Star Wars Character

The step definitions in starwars.steps.ts connect the feature file to the implementation:

````ts
import { Given, When, Then } from "@cucumber/cucumber";
import { makeHttpsRequest } from "../../src/core.ts";
import { strict as assert } from "node:assert";

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

let characterDetails: CharacterDetails;

Given("I have the character ID {int}", function (characterId: number) {
	this.characterId = characterId;
});

When("I retrieve the character", async function () {
	const response = await makeHttpsRequest(
		`https://swapi.dev/api/people/${this.characterId}/`,
	);
	characterDetails = response;
});

Then("I should see the character's details", () => {
	assert.ok(characterDetails.name);
});
```
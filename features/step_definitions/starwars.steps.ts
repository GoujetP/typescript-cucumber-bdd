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
	const response = await makeHttpsRequest<CharacterDetails>(
		`https://swapi.dev/api/people/${this.characterId}/`,
	);
	characterDetails = response;
});

Then("I should see the character's details", () => {
	assert.ok(characterDetails.name);
});

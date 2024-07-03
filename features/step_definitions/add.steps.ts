import { equal } from "node:assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { add } from "../../src/core.ts";

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

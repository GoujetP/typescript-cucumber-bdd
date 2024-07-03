import { equal } from "node:assert";

import { When, Then } from "@cucumber/cucumber";
import { sayHello } from "../../src/index.ts";

interface MyWorld {
	whatIHeard: string;
}

When("the greeter says hello", function (this: MyWorld) {
	this.whatIHeard = sayHello();
});

Then(
	"I should have heard {string}",
	function (this: MyWorld, expectedResponse: string) {
		equal(this.whatIHeard, expectedResponse);
	},
);

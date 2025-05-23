import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { createDeck, deal, handValue, Card, Hand } from "../../src/core.ts";

let deck: Card[] = [];
let player: Hand = [];
let dealer: Hand = [];
let rest: Card[] = [];
let result: number;

When("je crée un deck de cartes", function () {
  deck = createDeck();
});

Then("le deck doit contenir 52 cartes", function () {
  assert.equal(deck.length, 52);
});

Given("un deck mélangé", function () {
  deck = createDeck();
});

When("je distribue les cartes", function () {
  [player, dealer, rest] = deal(deck);
});

Then("la main du joueur contient 2 cartes", function () {
  assert.equal(player.length, 2);
});

Then("la main du croupier contient 2 cartes", function () {
  assert.equal(dealer.length, 2);
});

Then("il reste 48 cartes dans le deck", function () {
  assert.equal(rest.length, 48);
});

// ✅ Étape pour parser une main sous forme de JSON comme "[\"A♠\", \"9♦\"]"
Given("la main {string}", function (main: string) {
  const parseCard = (str: string): Card => ({
    value: str.slice(0, -1),
    suit: str.slice(-1),
  });

  try {
    const cards: string[] = JSON.parse(main);
    player = cards.map(parseCard);
  } catch (e) {
    throw new Error(`Erreur de parsing de la main : ${main}`);
  }
});

// ✅ Calcul de la valeur
When("je calcule la valeur de la main", function () {
  result = handValue(player);
});

// ✅ Vérification du résultat attendu
Then("la valeur doit être {int}", function (expected: number) {
  assert.equal(result, expected);
});

// Support des steps du type Given la main "["A♠", "9♦"]"
Given(/^la main "\[(.*)\]"$/, function (cartesStr: string) {
  const cartes = cartesStr.split(",").map(c => c.trim().replace(/"/g, ""));
  player = cartes.map(carte => ({
    value: carte.slice(0, -1),
    suit: carte.slice(-1),
  }));
});


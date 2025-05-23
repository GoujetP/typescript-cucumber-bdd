import { describe, it, expect, vi } from "vitest";
import { createDeck, deal, handValue, type Card, type Hand } from "./core";

describe("Card Game Functions", () => {
    describe("createDeck", () => {
        it("should create a deck with 52 cards", () => {
            const deck = createDeck();
            expect(deck).toHaveLength(52);
        });

        it("should create a deck with all suits and values", () => {
            const deck = createDeck();
            const suits = new Set(deck.map(card => card.suit));
            const values = new Set(deck.map(card => card.value));
            
            expect(suits).toEqual(new Set(["♠", "♥", "♦", "♣"]));
            expect(values).toEqual(new Set(["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]));
        });
    });

    describe("deal", () => {
        it("should deal 2 cards to player and dealer", () => {
            const deck = createDeck();
            const [player, dealer, remainingDeck] = deal(deck);
            
            expect(player).toHaveLength(2);
            expect(dealer).toHaveLength(2);
            expect(remainingDeck).toHaveLength(48);
        });

        it("should not have duplicate cards", () => {
            const deck = createDeck();
            const [player, dealer, remainingDeck] = deal(deck);
            
            const allCards = [...player, ...dealer, ...remainingDeck];
            const uniqueCards = new Set(allCards.map(card => `${card.suit}${card.value}`));
            
            expect(uniqueCards.size).toBe(52);
        });
    });

    describe("handValue", () => {
        it("should calculate correct value for number cards", () => {
            const hand: Hand = [
                { suit: "♠", value: "2" },
                { suit: "♥", value: "3" }
            ];
            expect(handValue(hand)).toBe(5);
        });

        it("should calculate correct value for face cards", () => {
            const hand: Hand = [
                { suit: "♠", value: "J" },
                { suit: "♥", value: "Q" }
            ];
            expect(handValue(hand)).toBe(20);
        });

        it("should handle aces correctly (high value)", () => {
            const hand: Hand = [
                { suit: "♠", value: "A" },
                { suit: "♥", value: "K" }
            ];
            expect(handValue(hand)).toBe(21);
        });

        it("should handle aces correctly (low value)", () => {
            const hand: Hand = [
                { suit: "♠", value: "A" },
                { suit: "♥", value: "A" },
                { suit: "♦", value: "A" }
            ];
            expect(handValue(hand)).toBe(13);
        });

        it("should handle multiple aces correctly", () => {
            const hand: Hand = [
                { suit: "♠", value: "A" },
                { suit: "♥", value: "A" },
                { suit: "♦", value: "K" }
            ];
            expect(handValue(hand)).toBe(12);
        });
    });
});
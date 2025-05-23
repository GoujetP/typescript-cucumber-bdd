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

export type Card = { suit: string; value: string };
export type Hand = Card[];

export function createDeck(): Card[] {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck: Card[] = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return shuffle(deck);
}

function shuffle(deck: Card[]): Card[] {
    return deck.sort(() => Math.random() - 0.5);
}

export function deal(deck: Card[]): [Hand, Hand, Card[]] {
    const player = [deck[0], deck[2]];
    const dealer = [deck[1], deck[3]];
    return [player, dealer, deck.slice(4)];
}

export function handValue(hand: Hand): number {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
        if (["J", "Q", "K"].includes(card.value)) value += 10;
        else if (card.value === "A") { value += 11; aces++; }
        else value += parseInt(card.value);
    }
    while (value > 21 && aces > 0) { value -= 10; aces--; }
    return value;
}


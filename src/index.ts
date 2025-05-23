import { createInterface } from "node:readline";
import { add } from "./core";
import { createDeck, deal, handValue } from "./core";
const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function playBlackjack() {
	let deck = createDeck();
	let [player, dealer, restDeck] = deal(deck);

	function showHands(hideDealer = true) {
		console.log(`Votre main: ${player.map(c => c.value + c.suit).join(" ")} (score: ${handValue(player)})`);
		if (hideDealer) {
			console.log(`Main du croupier: ${dealer[0].value + dealer[0].suit} ??`);
		} else {
			console.log(`Main du croupier: ${dealer.map(c => c.value + c.suit).join(" ")} (score: ${handValue(dealer)})`);
		}
	}

	function playerTurn() {
		showHands();
		if (handValue(player) >= 21) {
			return dealerTurn();
		}
		rl.question("Voulez-vous tirer une carte ? (o/n): ", (answer) => {
			if (answer.toLowerCase() === "o") {
				player.push(restDeck.shift()!);
				if (handValue(player) > 21) {
					showHands(false);
					console.log("Vous avez dépassé 21, le croupier gagne !");
					rl.close();
				} else {
					playerTurn();
				}
			} else {
				dealerTurn();
			}
		});
	}

	function dealerTurn() {
		while (handValue(dealer) < 17) {
			dealer.push(restDeck.shift()!);
		}
		showHands(false);
		const playerScore = handValue(player);
		const dealerScore = handValue(dealer);

		if (playerScore > 21 && dealerScore > 21) console.log("Égalité, tout le monde a dépassé 21 !");
		else if (playerScore > 21) console.log("Le croupier gagne !");
		else if (dealerScore > 21) console.log("Le joueur gagne !");
		else if (playerScore > dealerScore) console.log("Le joueur gagne !");
		else if (dealerScore > playerScore) console.log("Le croupier gagne !");
		else console.log("Égalité !");
		rl.close();
	}

	playerTurn();
}

const menu = () => {
	return "1: Add two numbers\n2: Play BlackJack\nChoose an option: ";
};

rl.question(menu(), (choice) => {
	switch (choice) {
		case "1":
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
		case "2":
			playBlackjack()
			break;
	}
});

class BlackjackGame {
    // Private fields
    #cards = [];
    #sum = 0;
    #hasBlackJack = false;
    #isAlive = false;
    #message = "";
    #messageEl;
    #sumEl;
    #cardsEl;  
    #playerEl; 

    constructor(playerName, playerChips) {
        this.player = { name: playerName, chips: playerChips };
        
        // DOM elements
        this.#messageEl = document.getElementById("message-el");
        this.#sumEl = document.getElementById("sum-el");
        this.#cardsEl = document.getElementById("cards-el");
        this.#playerEl = document.getElementById("player-el");

        this.#updatePlayerInfo();
    }

    // Public methods
    startGame() {
        this.#isAlive = true;
        const firstCard = this.#getRandomCard();
        const secondCard = this.#getRandomCard();
        this.#cards = [firstCard, secondCard];
        this.#sum = firstCard + secondCard;
        this.#renderGame();
    }

    newCard() {
        if (this.#isAlive && !this.#hasBlackJack) {
            const card = this.#getRandomCard();
            this.#cards.push(card);
            this.#sum += card;
            this.#renderGame();
        }
    }

    // Private methods
    #updatePlayerInfo() {
        this.#playerEl.textContent = `${this.player.name}: $${this.player.chips}`;
    }

    #getRandomCard() {
        const randomNumber = Math.floor(Math.random() * 13) + 1;
        return randomNumber > 10 ? 10 : randomNumber === 1 ? 11 : randomNumber;
    }

    #renderGame() {
        this.#cardsEl.textContent = `Cards: ${this.#cards.join(" ")}`;
        this.#sumEl.textContent = `Sum: ${this.#sum}`;
        
        if (this.#sum <= 20) {
            this.#message = "Do you want to draw a new card?";
        } else if (this.#sum === 21) {
            this.#message = "You've got Blackjack!";
            this.#hasBlackJack = true;
        } else {
            this.#message = "You're out of the game!";
            this.#isAlive = false;
        }

        this.#messageEl.textContent = this.#message;
    }

    // Optional: Expose a hidden reset method for debugging
    #resetGame() {
        this.#cards = [];
        this.#sum = 0;
        this.#hasBlackJack = false;
        this.#isAlive = false;
        this.#message = "";
        this.#renderGame();
    }

    // Public method for debugging (can be disabled in production)
    debugReset() {
        this.#resetGame();
        console.log("Game reset!");
    }
}

// Instantiate the game and bind it to the UI
const blackjackGame = new BlackjackGame("Per", 145);

// Hook up startGame and newCard to buttons in the HTML
document.getElementById("start-btn").addEventListener("click", () => blackjackGame.startGame());
document.getElementById("new-card-btn").addEventListener("click", () => blackjackGame.newCard());

// Debugging access
document.getElementById("reset-btn")?.addEventListener("click", () => blackjackGame.debugReset());

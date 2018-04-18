import Game from './Game';
import Player from './Player';
import WelcomeScreen from './WelcomeScreen';
import randomWords from 'random-words';

class App {
    constructor() {
        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'app-container';

        this.welcomeScreen = new WelcomeScreen();
        this.container.appendChild(this.welcomeScreen.container);

        this.generateWord();
        this.playerName = this.setPlayer();
        this.score = 0;
        this.countDown = 5;
        this.timer = 5;
        this.observers = [];


        // create player
        const player = new Player({
            playerName: this.playerName,
            score: this.score
        });

        // add player to observers
        this.addObserver(player);

        // append all components to game container
        this.container.appendChild(player.container);

        // create game
        this.game = new Game({
            score: this.score,
            wordToShow: this.wordToShow,
            timer: this.timer
        });

        // add game to observers
        this.addObserver(this.game);

        this.container.appendChild(this.game.container);
        this.startGame();
    }

    generateWord() {
        const word = randomWords();
        this.wordToMatch = word;
        this.wordToShow = this.scrambleWord(word);
    }

    scrambleWord(word) {
        const input = word.split("");
        const n = input.length;

        for (let i = n - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = input[i];
            input[i] = input[j];
            input[j] = tmp;
        }

        return input.join("");
    } 

    startGame() {
        // start countdown to zero
        const time = setInterval(() => {
            this.timer--;
            this.notify();

            if (this.timer === 0) {
                clearInterval(time);
                this.showResult();
            }

        }, 1000);

        const userAnswer = this.container.querySelector('.user-answer');

        userAnswer.addEventListener('keyup', (e) => {
            const answer = e.target.value;
            // check if there is user input and user hit the enter key
            if (this.timer >= 0 && e.keyCode === 13) {
                userAnswer.value = '';

                // check if there is a match and notify observers
                if (answer === this.wordToMatch) {
                    this.score += 5;
                    this.generateWord();
                    this.notify();
                }
            }
        })
    }

    resetGame() {
        this.timer = 5;
        this.startGame();
    }
    showResult() {
        console.error('show result');
    }

    setPlayer() {
        const currentUser = localStorage.getItem('user');
        const userInput = this.container.querySelector('.welcome-screen input');
        
        if (currentUser) return currentUser;

        userInput.addEventListener('keyup', (e) => {
            const username = e.target.value;
            
            if (e.keyCode === 13 && username.length) {
                this.playerName = username;
                userInput.value = '';
                this.welcomeScreen.container.classList.add('hidden');
                this.notify();

                localStorage.setItem('user', username);
            }
        })
    }

    notify() {
        this.observers.forEach(obs => obs.update(this));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

}

export default App;
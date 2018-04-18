import Game from './Game';
import Player from './Player';
import Home from './Home';
import randomWords from 'random-words';
import Result from './Result';

class App {
    constructor(props) {
        console.log(props);

        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'app-container';

        const home = new Home(props);
        this.container.appendChild(home.container);

        // attach all event listeners 
        this.attachListenter();
    }

    attachListenter() {
        const startBtn = this.container.querySelector('.start-btn');

        startBtn.addEventListener('click', () => {
            this.notify();
        })
    }

    coundDownPopUp() {

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
            console.error(this.timer);
            if (this.timer === 0) {
                clearInterval(time);
                // this.showResult();
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
                    // update score
                    this.score += 5;
                    // generate new word
                    this.generateWord();
                    // notify observers
                    this.notify();
                }
            }
        })
    }

    showResult() {
        this.result.container.classList.toggle('show');
        const playAgainBtn = this.container.querySelector('.play-again-btn');

        // attack click event to play again button
        playAgainBtn.addEventListener('click', () => {
            this.resetGame();
            // hide result container
            this.result.container.classList.toggle('show');
        })

    }

    handlePlayerLogin() {
        const currentUser = localStorage.getItem('user');
        console.log("User", currentUser);

        const userNameInput = this.container.querySelector('.username');

        if (currentUser) {
            this.showGameActions();
            return currentUser
        };

        userNameInput.addEventListener('keyup', (e) => {
            const username = e.target.value;

            if (e.keyCode === 13 && username.length) {
                this.playerName = username;
                userNameInput.value = '';
                this.home.container.classList.add('hidden');
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
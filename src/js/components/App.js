import Game from './Game';
import Player from './Player';
import Home from './Home';
import randomWords from 'random-words';
import Result from './Result';

class App {
    constructor(props) {
        this.props = { ...props };
        this.observers = [];

        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'app-container';

        const home = new Home(this.props);
        const player = new Player(this.props);
        const game = new Game(this.props);
        const result = new Result(this.props);

        this.container.appendChild(home.container);
        this.container.appendChild(game.container);
        this.container.appendChild(player.container);
        this.container.appendChild(result.container);

        this.addObserver(home);
        this.addObserver(player);
        this.addObserver(game);
        this.addObserver(result);

        // append all components to game container
        this.container.appendChild(player.container);
        this.container.appendChild(game.container);
        this.container.appendChild(result.container);

        // attach all event listeners 
        this.attachListenter();
    }

    attachListenter() {
        this._logUser();
    }

    _logUser() {
        const username = localStorage.getItem('user');

        if (username) {
            this.props.showGameActions = true;
            this.props.isPlayerLoggedIn = true;
            this.props.username = username;
            this.notify();
        } else {
            const userNameInput = this.container.querySelector('.username');

            userNameInput.addEventListener('keyup', (e) => {
                const username = e.target.value;

                if (e.keyCode === 13 && username.length) {
                    this.props.username = username;
                    this.props.isPlayerLoggedIn = true;
                    this.notify();

                    localStorage.setItem('user', username)
                }
            })

        }
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

    notify() {
        this.observers.forEach(obs => obs.update(this));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }
}

export default App;
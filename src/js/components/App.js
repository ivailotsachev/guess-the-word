import Game from './Game';
import Player from './Player';
import Home from './Home';
import randomWords from 'random-words';
import Result from './Result';
import LeaderBoard from './LeaderBoard';

import { TweenMax, Power2, TimelineLite } from "gsap";

class App {
    constructor(props) {
        // store initial game Config;
        this.gameConfig = { ...props };

        // set game props
        this.props = { ...props };

        this.observers = [];

        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'app-container';

        const home = new Home(this.props);
        const player = new Player(this.props);
        const game = new Game(this.props);
        const result = new Result(this.props);
        const leaderBoard = new LeaderBoard(this.props);

        this.container.appendChild(home.container);
        this.container.appendChild(game.container);
        this.container.appendChild(player.container);
        this.container.appendChild(result.container);
        this.container.appendChild(leaderBoard.container);

        this.addObserver(home);
        this.addObserver(player);
        this.addObserver(game);
        this.addObserver(result);
        this.addObserver(leaderBoard);

        // append all components to game container
        this.container.appendChild(player.container);
        this.container.appendChild(game.container);
        this.container.appendChild(result.container);
        this.container.appendChild(leaderBoard.container);

        // attach all event listeners 
        this.attachListeners();
    }

    attachListeners() {
        this._logUser();
        this._handleStartBtnCLick();
    }

    _handleStartBtnCLick() {
        const startBtn = this.container.querySelector('.start-btn');

        startBtn.addEventListener("click", () => {
            this.props.gameEnabled = true;
            this.startGame();
            this.notify();
        })
    }

    _logUser() {
        const username = localStorage.getItem('user');

        if (username) {
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

    generateWord() {
        const word = randomWords();
        this.props.wordToMatch = word;
        this.props.wordToShow = this.scrambleWord(word);
        console.warn(word);
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

    showResult() {
        // show result
        this.props.showResult = true;
        this.timer = this.gameConfig.timer;

        // check user current score
        const topScore = this.props.playerTopScore;
        const currentScore = this.props.currentScore = this.props.score

        console.warn('topscore', topScore);
        console.error('currentScore', currentScore);
        console.error(currentScore > topScore);

        if (currentScore > topScore) {
            this.props.playerTopScore = currentScore;
            this.props.newTopScore = true;
            this.notify();
        }


        // attach event to play again button
        this.handlePlayAgainBtnClick();
        this.updateLeaderBoard();

        // notify observers
        this.notify();
    }

    handlePlayAgainBtnClick() {
        const playAgainBtn = this.container.querySelector('.play-again-btn');

        playAgainBtn.addEventListener('click', (e) => {
            this.startGame();
        })
    }

    updateLeaderBoard() {
        const leaderBoard = localStorage.getItem('leaderBoard');
        console.error('update leaderboard');
    }

    notifyObserver(obsName) {
        const observer = this.observers.findIndex(obs => obs.name === obsName);
        this.observers[observer].update(this.props);
    }

    startGame() {
        // start countdown to zero
        console.error("START GAMEEEEEEEEEE")
        this.notifyObserver('player');

        // generate first word
        this.generateWord();
        let seconds = this.gameConfig.timer;

        // start countdown to 0
        const timer = setInterval(() => {
            --seconds;
            this.notifyObserver('game');
            console.log('seconds', seconds);

            if (seconds < 1) {
                clearInterval(timer);
                this.showResult();
                this.notify();
            }
        }, 1000);

        const userAnswer = this.container.querySelector('.user-answer');

        // userAnswer.addEventListener('keyup', (e) => {
        //     const answer = e.target.value;

        //     // check if there is user input and user hit the enter key
        //     if (seconds > 0 && e.keyCode === 13) {
        //         userAnswer.value = '';
        //         // check if there is a match and notify observers
        //         if (answer === this.props.wordToMatch) {
        //             // update score
        //             this.props.score += 5;
        //             // generate new word
        //             this.generateWord();
        //             // notify observers
        //             this.notify();
        //         }
        //     }
        // })
    }

    notify() {
        this.observers.forEach(obs => obs.update(this.props));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }
}

export default App;
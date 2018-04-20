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
        this._logOutUser();
        this._handleStartBtnCLick();
    }

    _handleStartBtnCLick() {
        const startBtn = this.container.querySelector('.start-btn');

        startBtn.addEventListener("click", () => {
            this.props.gameEnabled = true;
            this.notify();
            this.startGame();
        })
    }

    _logOutUser() {
        const logOutButton = this.container.querySelector('.logout-btn');
        
        logOutButton.addEventListener('click', () => {
            const users = JSON.parse(localStorage.getItem('users'));

            users.forEach(user => user.loggedIn = false);
            localStorage.setItem('users', JSON.stringify(users));

            this.props.isPlayerLoggedIn = false;
            this.notify();
        })
    }

    _logUser() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userNameInput = this.container.querySelector('.username');
        
        // check if user is already loggedIn
        const currentUser = users.filter(user => user.loggedIn === true);

        if (currentUser.length) {
            console.error('has user')
            this.props.userName = currentUser[0].userName;
            this.props.playerTopScore = currentUser[0].playerTopScore;
            this.props.isPlayerLoggedIn = true;
            this.notify();
            console.table(this.props);
            return;
        }

        userNameInput.addEventListener('keyup', (e) => {
            const userName = e.target.value;

            if (userName && e.keyCode === 13) {
                const user = {
                    userName,
                    playerTopScore: this.gameConfig.playerTopScore,
                    loggedIn: true,
                }

                const isPlayerExist = users.findIndex(user => user.userName.toLowerCase() === userName.toLowerCase())

                // if user dont exist
                if (isPlayerExist) {
                    users.push(user);
                    localStorage.setItem('users', JSON.stringify(users));

                    this.props.userName = userName;
                    this.props.isPlayerLoggedIn = true;
                    this.notify();
                } else {
                    const currentUser = users[isPlayerExist];
                    this.props.userName = currentUser.userName;
                    this.props.playerTopScore = currentUser.topScore;
                }
            }   
        })
    }

    generateWord() {
        const word = randomWords();
        this.props.wordToMatch = word;
        this.props.wordToShow = this.scrambleWord(word);
        this.notify();
        console.error(word);
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
        const currentScore = this.props.score;

        console.warn('topscore', topScore);
        console.warn('currentScore', currentScore);
        console.warn(currentScore > topScore);

        if (currentScore > topScore) {
            this.props.playerTopScore = currentScore;
            this.props.newTopScore = true;
        } else {
            this.props.newTopScore = false;
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
            this.resetGame();
            this.startGame();
        })
    }

    resetGame() {
        console.error('reset game');
        this.props.showResult = false;
        this.props.score = 0;
        this.props.timer = this.gameConfig.timer;
        this.notify();
    }

    startGame() {
        // start countdown to zero
        this.generateWord();
        clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            this.props.timer--;
            this.notifyObserver('game');
            
            if (this.props.timer === 0) {
                clearInterval(this.timer);
                this.showResult();
                this.notify();
            }
        }, 1000);
        
        const userAnswer = this.container.querySelector('.user-answer');

        userAnswer.addEventListener('keyup', (e) => {
            const answer = e.target.value;

            // check if there is user input and user hit the enter key
            if (this.props.timer > 0 && e.keyCode === 13) {
                userAnswer.value = '';
                // check if there is a match and notify observers
                if (answer === this.props.wordToMatch) {
                    // update score
                    this.props.score += 5;
                    // generate new word
                    this.generateWord();
                    // notify observers
                    this.notify();
                }
            }
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

    notify() {
        this.observers.forEach(obs => obs.update(this.props));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }
}

export default App;
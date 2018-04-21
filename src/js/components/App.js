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

        this.container.appendChild(player.container);
        this.container.appendChild(home.container);
        this.container.appendChild(game.container);
        this.container.appendChild(result.container);
        this.container.appendChild(leaderBoard.container);

        this.addObserver(home);
        this.addObserver(player);
        this.addObserver(game);
        this.addObserver(result);
        this.addObserver(leaderBoard);

        // attach all event listeners 
        this.attachListeners();

        this.notify();
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
        console.error(logOutButton)
        logOutButton.addEventListener('click', () => {
            const users = JSON.parse(localStorage.getItem('users'));

            users.forEach(user => user.loggedIn = false);

            this.props.isPlayerLoggedIn = false;
            this.props.userName = this.gameConfig.userName;
            this.props.score = this.gameConfig.score;

            localStorage.setItem('users', JSON.stringify(users));
            this.notify();
        })
    }

    _logUser() {
        // get users on game init
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userNameInput = this.container.querySelector('input.username');
        console.error(userNameInput);
        // check if user is already loggedIn
        const currentUser = users.filter(user => user.loggedIn === true);
        console.warn("LOGGED IN USER", currentUser);

        if (currentUser.length) {
            // user is already logged in
            console.error('user is already logged in')

            this.props.userName = currentUser[0].userName;
            this.props.playerTopScore = currentUser[0].playerTopScore;
            this.props.isPlayerLoggedIn = true;

            this.notify();
        } else {
            console.log("LOGIN ELSE");

            userNameInput && userNameInput.addEventListener('keyup', (e) => {
                const userName = e.target.value;
                console.log(userName);
                if (userName && e.keyCode === 13) {
                    // check in database if there is already user with this name
                    console.log(e.target.value);
                    const userIndex = users.findIndex(user => user.userName.toLowerCase() === e.target.value.toLowerCase());

                    if (userIndex === -1) {
                        console.warn('there is no user reg');
                        console.error('user was registered');

                        const user = {
                            userName: userName,
                            playerTopScore: this.gameConfig.playerTopScore,
                            loggedIn: true,
                        }

                        this.props.userName = userName;
                        this.props.playerTopScore = this.gameConfig.playerTopScore;
                        this.props.isPlayerLoggedIn = true;
                        this.notify();

                        users.push(user);
                        localStorage.setItem('users', JSON.stringify(users));

                    } else {
                        console.warn('there is user reg');
                        const player = users[userIndex];

                        this.props.userName = player.userName;
                        this.props.playerTopScore = player.playerTopScore;
                        this.props.isPlayerLoggedIn = true;

                        const user = { ...player, loggedIn: true };

                        // update user data in database
                        const updateUsers = [...users.slice(0, userIndex), user, ...users.slice(userIndex + 1)];
                        console.log('usalsdlaskj', updateUsers);

                        localStorage.setItem('users', JSON.stringify(updateUsers));

                        this.notify()
                    }

                    e.target.value = '';
                }

            })
        }

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

        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.loggedIn === true);
        const player = users[userIndex];

        console.error('player', player);

        if (currentScore > topScore) {

            this.props.playerTopScore = currentScore;
            this.props.newTopScore = true;

            const player = users[userIndex];
            const user = { ...player, playerTopScore: currentScore };

            // update player data in database:
            const updateUsers = [...users.slice(0, userIndex), user, ...users.slice(userIndex + 1)];
            console.log('usalsdlaskj', updateUsers);

            localStorage.setItem('users', JSON.stringify(updateUsers));

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
import Game from './Game';
import Player from './Player';
import Home from './Home';
import randomWords from 'random-words';
import Result from './Result';
import LeaderBoard from './LeaderBoard';

class App {
    constructor(props) {
        // store initial game Config and keep it
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

        // Appednd all items
        this.container.appendChild(player.container);
        this.container.appendChild(home.container);
        this.container.appendChild(game.container);
        this.container.appendChild(result.container);
        this.container.appendChild(leaderBoard.container);

        // Add items to observer
        this.addObserver(home);
        this.addObserver(player);
        this.addObserver(game);
        this.addObserver(result);
        this.addObserver(leaderBoard);

        // attach all event listeners 
        this.attachListeners();
        // Initial notify
        this.notify();
    }

    attachListeners() {
        this._logOutUser();
        this._logUser();
        this._handleStartBtnCLick();
        this._toggleLeaderBoard();
        this._handleCloseButtonClick();
    }

    _handleCloseButtonClick() {
        const closeBtn = this.container.querySelector('.close-btn');

        closeBtn.addEventListener('click', () => {
            this.props.showLeaderBoard = false;
            console.error('clicked');
            this.notify();
        })
    }

    _toggleLeaderBoard() {
        const leaderBoardBtns = this.container.querySelectorAll('.show-lb-btn');

        leaderBoardBtns.forEach(btn => btn.addEventListener('click', () => {
            this.props.showLeaderBoard = true;
            this.props.notifyLeaderBoard = true;

            this.notify();
        }))

    }
    _handleStartBtnCLick() {
        const startBtn = this.container.querySelector('.start-btn');

        startBtn.addEventListener("click", () => {
            this.props.gameEnabled = true;
            this.props.isGameActive = true;
            this.notify();
            this.startGame();
        })
    }

    _resetGame() {
        this.props.isPlayerLoggedIn = false;
        this.props.score = this.gameConfig.score;
        this.props.timer = this.gameConfig.timer;
        this.props.showResult = false;
        this.props.notifyLeaderBoard = false;
        this.props.playerTopScore = this.gameConfig.playerTopScore;
        this.props.gameEnabled = false;
    }

    _logOutUser() {
        // get all logout buttons and attach event
        const logOutBtns = this.container.querySelectorAll('.logout-btn');

        logOutBtns.forEach(btn => btn.addEventListener('click', () => {
            const dataUsers = JSON.parse(localStorage.getItem('users'));


            dataUsers.forEach(user => user.loggedIn = false);
            localStorage.setItem('users', JSON.stringify(dataUsers));

            this._resetGame();

            console.error("LOG OUT");
            console.table(JSON.parse(localStorage.getItem('users')));

            this._logUser();
            this.notify();
        }));
    }

    updateUsersDataBase(collection, index, user) {
        const updateUsers = [...collection.slice(0, index), user, ...collection.slice(index + 1)];
        localStorage.setItem('users', JSON.stringify(updateUsers));
    }

    _getLoggedInUser(users) {
        return users.findIndex(user => user.loggedIn === true);
    }

    _getUserByName(collection, username) {
        return collection.findIndex(user => user.userName === username);
    }

    _logUser() {

        // 1st check for users
        const userNameInput = this.container.querySelector('input.username');
        let users = JSON.parse(localStorage.getItem('users')) || [];

        console.warn('_logUSER initial DATA');
        console.table(users);

        const loggedInUserIndex = this._getLoggedInUser(users);
        console.warn('loggedInUser', loggedInUserIndex);

        if (loggedInUserIndex !== -1) {
            console.error('user found - log him')
            const user = users[loggedInUserIndex];
            console.error(user);

            this.props.isPlayerLoggedIn = true;
            this.props.userName = user.userName;
            this.props.playerTopScore = user.playerTopScore;
            this.props.score = this.gameConfig.score;

            this.notify();
            return;
        } else {
            console.error('no loggeed in user')
            userNameInput.addEventListener('keypress', (e) => {
                const userName = e.target.value;
                if (userName && e.keyCode === 13) {
                    // if user exist
                    let regUserIndex = this._getUserByName(users, userName);
                    console.error('regUserIndex', regUserIndex);

                    if (regUserIndex !== -1) {
                        console.error('there is user with same username');
                        const user = users[regUserIndex];

                        this.props.userName = user.userName;
                        this.props.playerTopScore = user.playerTopScore;
                        this.props.score = this.gameConfig.score;
                        this.props.isPlayerLoggedIn = true;

                        const updateUser = { ...user, loggedIn: true };

                        this.updateUsersDataBase(users, regUserIndex, updateUser);
                        this.notify();

                    } else {
                        console.error('no such user -> reg new')
                        const user = {
                            userName,
                            playerTopScore: this.gameConfig.playerTopScore,
                            score: this.gameConfig.score,
                            loggedIn: true
                        }
                        users.push(user);
                        localStorage.setItem('users', JSON.stringify(users));

                        this.props.isPlayerLoggedIn = true;
                        this.props.userName = user.userName;
                        this.props.playerTopScore = user.playerTopScore;
                        this.props.score = user.score;

                        this.notify();
                    }
                }
            })
        }

    }

    generateWord() {
        const word = randomWords();
        this.props.wordToMatch = word;
        this.props.wordToShow = this.scrambleWord(word);
        this.notify();
        this.props.debug.logWord && console.log(word)
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
        this.props.isGameActive = false;
        this.props.gameEnabled = false;
        this.timer = this.gameConfig.timer;

        // check user current score
        const topScore = this.props.playerTopScore;
        const currentScore = this.props.score;
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.loggedIn === true);
        const player = users[userIndex];

        if (currentScore > topScore) {

            this.props.playerTopScore = currentScore;
            this.props.newTopScore = true;

            const player = users[userIndex];
            const user = { ...player, playerTopScore: currentScore };

            // update player data in database:
            const updateUsers = [...users.slice(0, userIndex), user, ...users.slice(userIndex + 1)];

            localStorage.setItem('users', JSON.stringify(updateUsers));

        } else {
            this.props.newTopScore = false;
        }

        // attach event to play again button
        this.handlePlayAgainBtnClick();

        // notify observers
        this.notify();
    }


    handlePlayAgainBtnClick() {
        const playAgainBtn = this.container.querySelector('.play-again-btn');

        playAgainBtn.addEventListener('click', (e) => {
            this.restartGame();
            this.startGame();
        })
    }

    restartGame() {
        this.props.showResult = false;
        this.props.gameEnabled = true;
        this.props.score = 0;
        this.props.timer = this.gameConfig.timer;
        this.notify();
    }

    startGame() {
        this.props.notifyLeaderBoard = false;
        this.props.isGameActive = true;
        this.generateWord();

        clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.props.timer--;
            this.notify();

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

    notify() {
        this.observers.forEach(obs => obs.update(this.props));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }
}

export default App;
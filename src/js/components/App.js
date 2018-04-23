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

            this._resetGame();

            dataUsers.forEach(user => user.loggedIn = false);
            localStorage.setItem('users', JSON.stringify(dataUsers));

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
        const users = JSON.parse(localStorage.getItem('users'));

        const userNameInput = this.container.querySelector('input.username');
        let user;

        // if users exits
        if (users) {

            // 1. check for logged in user and log it /refresh browser case /
            const users = JSON.parse(localStorage.getItem('users'));
            const loggedInUser = users.filter(user => user.loggedIn === true);

            if (loggedInUser.length) {
                const userToLog = this._getLoggedInUser(users);

                this.props.userName = users[userToLog].userName;
                this.props.isPlayerLoggedIn = true;
                this.props.playerTopScore = users[userToLog].playerTopScore;
                this.score = this.gameConfig.score;

                this.notify();
            } else {
                userNameInput.addEventListener('keyup', (e) => {
                    const userName = e.target.value;

                    if (userName && e.keyCode === 13) {
                        // get username and check data for existing user
                        const registeredUser = users.filter(user => user.userName === userName);
                        // if user is already registered log him
                        if (registeredUser.length) {
                            const userIndex = this._getUserByName(users, registeredUser[0].userName);

                            // set user loggedIn property to true
                            const updateUser = users[userIndex];
                            updateUser.loggedIn = true;

                            this.updateUsersDataBase(users, userIndex, updateUser);

                            // update game
                            this.props.userName = updateUser.userName;
                            this.props.playerTopScore = updateUser.playerTopScore;
                            this.props.isPlayerLoggedIn = true;

                        } else {
                            // create new user;
                            user = {
                                userName,
                                playerTopScore: this.gameConfig.playerTopScore,
                                score: this.gameConfig.score,
                                loggedIn: true
                            }

                            this.props.isPlayerLoggedIn = true;
                            this.props.userName = user.userName;
                            this.props.playerTopScore = user.playerTopScore;
                            this.props.score = user.score;

                            users.push(user);
                            localStorage.setItem('users', JSON.stringify(users));
                        }

                        e.target.value = '';
                        this.notify();
                    }
                })
            }


        } else {
            const initialUsers = [];
            // case no user and database users
            if (!users) {
                // First case on game init
                userNameInput.addEventListener('keyup', (e) => {
                    const userName = e.target.value;

                    if (userName && e.keyCode === 13) {
                        user = {
                            userName,
                            playerTopScore: this.gameConfig.playerTopScore,
                            score: this.gameConfig.score,
                            loggedIn: true,
                        }

                        initialUsers.push(user);
                        localStorage.setItem('users', JSON.stringify(initialUsers));

                        this.props.isPlayerLoggedIn = true;
                        this.props.userName = userName;

                        e.target.value = ''
                        this.notify();
                    }
                })
            }
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
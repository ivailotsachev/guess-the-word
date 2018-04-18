import Game from './Game';
import Player from './Player';
import WelcomeScreen from './WelcomeScreen';

class App {
    constructor() {
        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'app-container';

        this.welcomeScreen = new WelcomeScreen();
        this.container.appendChild(this.welcomeScreen.container);

        this.playerName = this.setPlayer();
        this.score = 0;
        this.wordToMatch = this.generateWord();
        this.countDown = 5;
        this.timer = 40;
        this.observers = [];


        // create player
        const player = new Player({playerName: this.playerName, score: this.score});
        this.addObserver(player);

        // append all components to game container
        this.container.appendChild(player.container);

        this.game = new Game({
            score: this.score,
            wordToMatch: this.wordToMatch,
            timer: this.timer
        });

        this.addObserver(this.game);
        this.container.appendChild(this.game.container);
        this.notify();

        this.startGame();
    }

    generateWord() {
        return 'word'
    }

    startGame() {
        const time = setInterval(() => {
            this.timer--;
            this.notify();

            if (this.timer === 0) {
                clearInterval(time);
            }

        }, 1000);

        const userAnswer = this.container.querySelector('.user-answer');

        userAnswer.addEventListener('keyup', (e) => {
            const answer = e.target.value;
            if (this.timer >= 0 && e.keyCode === 13) {
                userAnswer.value = '';
                
                if (answer === this.wordToMatch) {
                    this.score += 5;
                    this.notify();
                }
            }
        })
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
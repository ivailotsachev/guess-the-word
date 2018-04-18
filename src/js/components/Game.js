import Player from './Player';
import WelcomeScreen from './WelcomeScreen';

class Game {
    constructor() {
        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'game-container';

        this.welcomeScreen = new WelcomeScreen();
        this.container.appendChild(this.welcomeScreen.container);

        this.playerName = this.setPlayer();
        this.score = 0;
        this.wordToMatch = 'word'
        this.observers = [];


        // create player
        const player = new Player({playerName: this.playerName, score: this.score});
        this.addObserver(player);

        // append all components to game container
        this.container.appendChild(player.container);

        this.notify();
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

    render() {
        const root = document.getElementById('root');
        root.appendChild(this.container);
    }

}

export default Game;
import Player from './Player';

class Game {
    constructor() {
        this.observers = [];

        // Game Initial props
        this.userName = 'Alex';
        this.score = 0;
        this.wordToMatch = 'word'

        // Create game container
        this.container = document.createElement('section');
        this.container.className = 'game-conatainer';

        // create player
        const player = new Player({userName: this.userName, score: this.score});
        this.addObserver(player);

        // append all components to game container
        this.container.appendChild(player.container);
        this.notify();
    }

    notify() {
        console.log('game notify...');
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
class Game {
    constructor(props) {
        console.log("Game", props);
        this.container = document.createElement('div');
        this.container.className = 'game-container';

        this.wordField = document.createElement('h2');
        this.wordField.className = 'word-to-match';
        this.wordField.innerHTML = props.wordToShow;

        this.timeField = document.createElement('h4');
        this.timeField.innerHTML = `Time left: ${props.timer}`

        this.userAnswer = document.createElement('input');
        this.userAnswer.className = 'user-answer';

        this.hint = document.createElement('p');
        this.hint.innerHTML = 'Enter you suggestion and hit enter';

        this.container.appendChild(this.timeField);
        this.container.appendChild(this.wordField);
        this.container.appendChild(this.userAnswer);
        this.container.appendChild(this.hint);
    }

    update(props) {
        this.timeField.innerHTML = `Time Left: ${props.timer}`
        this.wordField.innerHTML = props.wordToShow;
    }
}

export default Game;
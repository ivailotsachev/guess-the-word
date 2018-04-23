import { TweenMax, Bounce, TimelineLite } from "gsap";

class Game {
    constructor(props) {
        this.name = 'game';
        this.container = document.createElement('div');
        this.container.className = 'game-container';

        this.wordField = document.createElement('h2');
        this.wordField.className = 'word-to-match';

        this.timeField = document.createElement('h4');
        this.timeField.classList = 'game-timer';

        this.scoreField = document.createElement('h4');
        this.scoreField.classList = 'game-score';

        this.userAnswer = document.createElement('input');
        this.userAnswer.className = 'user-answer';

        this.hint = document.createElement('p');
        this.hint.innerHTML = 'Enter you suggestion and hit enter';

        this.container.appendChild(this.scoreField);
        this.container.appendChild(this.timeField);
        this.container.appendChild(this.wordField);
        this.container.appendChild(this.userAnswer);
        this.container.appendChild(this.hint);
    }

    update(props) {
        const { gameEnabled, isGameActive, score } = props;

        gameEnabled ? this.container.classList.add('show') : this.container.classList.remove('show');
        gameEnabled && TweenMax.to(this.container, 0.6, { y: 0, ease: Bounce.easeOut })

        this.timeField.innerHTML = `Time Left: <span class="time">${props.timer}</span>`;
        this.wordField.innerHTML = `${props.wordToShow}`;
        this.scoreField.innerHTML = `Current score <span class="score-counter">${props.score}</span>`
    }

    setFocus() {
        const el = this.container.querySelector('.user-answer');
        el.autofocus = true;
    }

    removeFocus() {
        const el = this.container.querySelector('.user-answer');
        el.autofocus = false;
    }
}

export default Game;
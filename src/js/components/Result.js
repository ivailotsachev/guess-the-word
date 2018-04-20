class Result {
    constructor(data) {
        this.name = 'result';

        this.container = document.createElement('div');
        this.container.className = 'result-container';

        this.greetings = document.createElement('h2');
        this.greetings.className = 'greetings';
        this.container.appendChild(this.greetings);

        this.userScore = document.createElement('h4');
        this.container.appendChild(this.userScore);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.className = 'play-again-btn';
        this.playAgainBtn.innerHTML = 'Play again';
        this.container.appendChild(this.playAgainBtn);

    }

    update(props) {
        // console.error('result update', props);
        this.userScore.innerHTML = `Your Score: ${props.score}`;
        props.showResult ? this.container.classList.add('show') : this.container.classList.remove('show');

        if (props.newTopScore) {
            console.warn('new top score')
        }
    }
}

export default Result;
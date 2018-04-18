class Result {
    constructor(props) {
        console.warn("Result", props);
        this.container = document.createElement('div');
        this.container.className = 'result-container';

        this.userScore = document.createElement('h4');
        this.container.appendChild(this.userScore);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.className = 'play-again-btn';
        this.playAgainBtn.innerHTML = 'Play again';

        this.container.appendChild(this.playAgainBtn);
    }

    update(props) {
        console.warn("RESULT UPADATE", props);
        this.userScore.innerHTML = `Your Score: ${props.score}`;
    }
}

export default Result;
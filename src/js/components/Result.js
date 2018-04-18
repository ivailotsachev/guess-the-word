class Result {
    constructor(data) {
        // console.log("Result", data);
        this.container = document.createElement('div');
        this.container.className = 'result-container';

        this.userScore = document.createElement('h4');
        this.container.appendChild(this.userScore);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.className = 'play-again-btn';
        this.playAgainBtn.innerHTML = 'Play again';

        this.container.appendChild(this.playAgainBtn);
    }

    update(data) {
        // console.warn("RESULT UPADATE", data);
        // this.userScore.innerHTML = `Your Score: ${props.score}`;
    }
}

export default Result;
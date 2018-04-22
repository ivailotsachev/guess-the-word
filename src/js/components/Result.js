class Result {
    constructor(data) {
        this.name = 'result';

        this.container = document.createElement('div');
        this.container.className = 'result-container';

        this.greetings = document.createElement('h2');
        this.greetings.className = 'greetings';

        this.userScore = document.createElement('h4');
        this.container.appendChild(this.userScore);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.className = 'play-again-btn';
        this.playAgainBtn.innerHTML = 'Play again';

        this.showLeaderBoardBtn = document.createElement('button');
        this.showLeaderBoardBtn.className = 'show-lb-btn';
        this.showLeaderBoardBtn.textContent = 'Leaderboard';

        this.logOutBtn = document.createElement('button');
        this.logOutBtn.className = 'logout-btn';
        this.logOutBtn.innerHTML = 'Exit Game';

        this.container.appendChild(this.greetings);
        this.container.appendChild(this.playAgainBtn);
        this.container.appendChild(this.showLeaderBoardBtn);
        this.container.appendChild(this.logOutBtn);

    }

    update(props) {
        // console.error('result update', props);
        this.userScore.innerHTML = `Your Score: ${props.score}`;
        props.showResult ? this.container.classList.add('show') : this.container.classList.remove('show');

        if (props.newTopScore)
            this.userScore.innerHTML = `Awesome !!! <br/> Your new top score: ${props.score}`;
    }
}

export default Result;
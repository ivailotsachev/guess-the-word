class Player {
    constructor(props) {
        console.log("Player props", props);

        this.container = document.createElement('div');
        this.container.className = 'player-container';

        this.playerName = document.createElement('h3');
        this.playerName.className = 'username';
        this.playerName.innerHTML = props.playerName;

        this.scoreField = document.createElement('span');
        this.scoreField.innerHTML = props.score;

        this.container.appendChild(this.playerName);
        this.container.appendChild(this.scoreField);
    }

    update(props) {
        const { playerName, score } = props;

        this.playerName.innerHTML = playerName;
        this.scoreField.innerHTML = `score: ${score}`;
    }

    startGame() {
        console.log('game start');
    }
}

export default Player;
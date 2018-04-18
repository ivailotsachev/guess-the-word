class Player {
    constructor(props) {
        console.log(props);
        this.container = document.createElement('div');
        this.container.className = 'player-container';

        this.userName = document.createElement('h3');
        this.userName.className = 'username';
        this.userName.innerHTML = props.userName;

        this.scoreField = document.createElement('span');
        this.scoreField.innerHTML = props.score;

        this.container.appendChild(this.userName);
        this.container.appendChild(this.scoreField);
    }

    update(props) {
        console.log("Player update with", props);
        const { userName, score } = props;

        this.userName.innerHTML = userName;
        this.scoreField.innerHTML = `score: ${score}`;

    }
}

export default Player;
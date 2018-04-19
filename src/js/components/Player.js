class Player {
    constructor(props) {
        // console.log("Player props", data);
        this.name = 'player';
        this.container = document.createElement('div');
        this.container.className = 'player-container';

        this.username = document.createElement('h3');
        this.username.className = 'username';

        this.scoreField = document.createElement('span');
        this.scoreField.className = 'score';

        this.container.appendChild(this.username);
        this.container.appendChild(this.scoreField);
    }

    update(props) {
        console.error('player update');
        if (props.username) this.username.textContent = `Welcome ${props.username}`;
        this.scoreField.textContent = `Score: ${props.score}`;
    }
}

export default Player;
class Player {
    constructor(data) {
        // console.log("Player props", data);

        this.container = document.createElement('div');
        this.container.className = 'player-container';

        this.playerName = document.createElement('h3');
        this.playerName.className = 'username';
        this.playerName.innerHTML = data.username;
        this.scoreField = document.createElement('span');
        this.scoreField.innerHTML = 'score'

        this.container.appendChild(this.playerName);
        this.container.appendChild(this.scoreField);
    }

    update(data) {
        // console.error("player", data);
    }

    startGame() {
        console.log('game start');
    }
}

export default Player;
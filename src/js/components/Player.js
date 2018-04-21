class Player {
    constructor(props) {
        this.name = 'player';
        this.container = document.createElement('div');
        this.container.className = 'player-container';

        this.username = document.createElement('h3');
        this.username.className = 'username';

        this.logOutBtn = document.createElement('button');
        this.logOutBtn.className = 'logout-btn';
        this.logOutBtn.innerHTML = 'Log Out';

        this.scoreField = document.createElement('span');
        this.scoreField.className = 'score';

        this.container.appendChild(this.username);
        this.container.appendChild(this.scoreField);
        this.container.appendChild(this.logOutBtn);
    }

    update(props) {

        console.error('player update', props);
        const { isPlayerLoggedIn, userName, score } = props;

        console.log(this.container);

        if (isPlayerLoggedIn) {
            this.container.classList.remove('hide');
            this.username.innerHTML = `Player: ${userName}`;
            this.scoreField.innerHTML = `Score: ${score}`;
        } else {
            this.container.classList.add('hide');
        }


    }
}

export default Player;
class Player {
    constructor(props) {
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
        // console.error('player update', props);
        this.props = { ...props };
        const { isPlayerLoggedIn, userName, score } = props;

        if (isPlayerLoggedIn) {
            this.container.classList.add('show');
            this.username.innerHTML = `Welcome: ${userName}`;
            this.scoreField.innerHTML = `Score: ${score}`;
        } else {
            this.container.classList.remove('show');
        }


    }
}

export default Player;
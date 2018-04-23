import { TweenMax, Power2, TimelineLite } from "gsap";

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
        const { isPlayerLoggedIn, userName, score, playerTopScore, isGameActive } = props;

        if (isPlayerLoggedIn) {
            this.container.classList.remove('hide');
            this.username.innerHTML = `Player: <span class="player-name">${userName}</span>`;
            this.scoreField.innerHTML = `
                Best Score: <span>${playerTopScore}</span> 
                Score: <span>${score}</span>`;
        } else {
            this.container.classList.add('hide');
        }

        isGameActive ?
            this.logOutBtn.setAttribute('disabled', 'disabled')
            :
            this.logOutBtn.removeAttribute('disabled');
    }
}

export default Player;
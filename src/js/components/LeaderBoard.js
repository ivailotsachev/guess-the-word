import { TweenMax, Power2, TimelineLite } from "gsap";

class LeaderBoard {
    constructor(props) {
        this.container = document.createElement('div');
        this.container.className = 'leaderboard';

        this.closeBtn = document.createElement('span');
        this.closeBtn.className = 'close-btn';
        this.items = document.createElement('div');

        this.container.appendChild(this.closeBtn);
        this.container.appendChild(this.items);

    }

    update(props) {
        const { showLeaderBoard } = props;
        const users = JSON.parse(localStorage.getItem('users'));
        this.items.innerHTML = '';

        users && users
            .sort((a, b) => a.playerTopScore < b.playerTopScore)
            .forEach(user => {
                const userEl = document.createElement('div');
                const userName = document.createElement('h4');
                const score = document.createElement('p');

                userEl.className = 'leaderboard-item';

                userName.innerHTML = user.userName;
                score.innerHTML = user.playerTopScore;

                userEl.appendChild(userName)
                userEl.appendChild(score);
                this.items.appendChild(userEl);
            })

        const elements = this.container.querySelectorAll('.leaderboard-item')
        TweenMax.staggerFromTo(elements, 0.3, { y: 100 }, { y: 0 }, 0.1);
        showLeaderBoard && this.container.classList.add('show');
    }
}

export default LeaderBoard;
class LeaderBoard {
    constructor(props) {
        this.container = document.createElement('div');
        this.container.className = 'leaderboard';

        this.closeBtn = document.createElement('span');
        this.closeBtn.className = 'close-btn';
        this.container.appendChild(this.closeBtn);
    }

    update(props) {
        const users = JSON.parse(localStorage.getItem('users'));
        const { notifyLeaderBoard, showLeaderBoard } = props;
        let sortedUsers;

        if (users) sortedUsers = users.sort((a, b) => a.playerTopScore < b.playerTopScore);

        if (showLeaderBoard) {
            this.container.classList.add('show');
            this.renderBoard(sortedUsers);
        } else {
            this.container.classList.remove('show');
        }
    }

    renderBoard(data) {

        const div = document.createElement('div');
        const nameField = document.createElement('h3');
        const scoreField = document.createElement('p');

        data.forEach(player => {
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            const nameField = document.createElement('h3');
            const scoreField = document.createElement('p');

            nameField.textContent = player.userName;
            scoreField.textContent = player.playerTopScore;

            div.appendChild(nameField);
            div.appendChild(scoreField);

            this.container.appendChild(div);
        })
    }
}

export default LeaderBoard;
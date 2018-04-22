class LeaderBoard {
    constructor(props) {
        this.container = document.createElement('div');
        this.container.className = 'leaderboard';
    }

    update(props) {
        const users = JSON.parse(localStorage.getItem('users'));
        const { notifyLeaderBoard } = props;
        let sortedUsers;

        if (users) sortedUsers = users.sort((a, b) => a.playerTopScore < b.playerTopScore);
        notifyLeaderBoard && this.renderBoard(sortedUsers);
    }

    renderBoard(data) {

        const div = document.createElement('div');
        const nameField = document.createElement('h3');
        const scoreField = document.createElement('p');

        data.forEach(player => {
            const div = document.createElement('div');
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
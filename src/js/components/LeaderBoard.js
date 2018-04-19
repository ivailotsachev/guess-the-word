class LeaderBoard {
    constructor(props) {
        this.container = document.createElement('div');
        this.container.className = 'leaderboard';
    }

    update(data) {
        const { props } = data;
        // console.log('leaderboard update', props);
    }
}

export default LeaderBoard;
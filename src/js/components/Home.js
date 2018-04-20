class Home {
    constructor(props) {
        // console.log("Home props", props);

        this.container = document.createElement('div');
        this.container.className = 'home-screen';

        this.title = document.createElement('h1');
        this.title.className = 'game-title';
        this.title.innerHTML = 'Guess The Word';

        this.userNameInput = document.createElement('input');
        this.userNameInput.className = 'username';
        this.userNameInput.setAttribute('placeholder', 'username');
        this.userNameInput.setAttribute('autofocus', true);

        this.message = document.createElement('p');
        this.message.innerHTML = 'Choose your username and hit ENTER to start the Game';

        this.startBtn = document.createElement('button');
        this.startBtn.className = 'start-btn';
        this.startBtn.innerHTML = 'start';

        this.logOutBtn = document.createElement('button');
        this.logOutBtn.className = 'logout-btn';
        this.logOutBtn.innerHTML = 'Log Out';

        this.container.appendChild(this.title);
        this.container.appendChild(this.userNameInput);
        this.container.appendChild(this.message);
        this.container.appendChild(this.startBtn);
        this.container.appendChild(this.logOutBtn);

    }

    update(props) {
        // console.warn('Home Update', props);
        const { isPlayerLoggedIn } = props;

        if (isPlayerLoggedIn) {
            this.userNameInput.classList.add('hide');
            this.logOutBtn.classList.add('show');
            this.message.innerHTML = '';
            this.startBtn.classList.add('show');
        } else {
            this.startBtn.classList.remove('show');
            this.userNameInput.classList.remove('hide');
            this.message.textContent = 'Choose your username and hit ENTER to start the Game';
            this.logOutBtn.classList.remove('show');
        }

    }
}

export default Home;
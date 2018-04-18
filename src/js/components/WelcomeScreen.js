class WelcomeScreen {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'welcome-screen';

        this.title = document.createElement('h1');
        this.title.className = 'game-title';
        this.title.innerHTML = 'Guess The Word';

        this.userInput = document.createElement('input');
        this.userInput.setAttribute('placeholder', 'username')

        this.message = document.createElement('p');
        this.message.innerHTML = 'Choose your username and hit ENTER to start the Game';

        this.container.appendChild(this.title);
        this.container.appendChild(this.userInput);
        this.container.appendChild(this.message);

        this.checkUser();
    }

    checkUser() {
        const user = localStorage.getItem('user');
        user && this.hide()
    }

    hide() {
        this.container.classList.add('hidden');
    }
}

export default WelcomeScreen;
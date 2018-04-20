/* Import Styles */
import '../styles/styles.scss';
/* Import components */
import App from './components/App';

/* set intial game params */
const gameConfig = {
    score: 0,
    userName: null,
    timer: 5,
    isPlayerLoggedIn: false,
    gameEnabled: false,
    showResult: false,
    playerTopScore: 0,
    playerCurrentScore: 0,
    wordToShow: null,
    wordToMatch: null,
    playAgain: false,
    newTopScore: false
}

const app = new App({ ...gameConfig });
const root = document.getElementById('root');

root.appendChild(app.container);
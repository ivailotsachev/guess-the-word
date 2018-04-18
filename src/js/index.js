import '../styles/styles.scss';
/* Import components */
import App from './components/App';

/* set intial game state */
const initialGameState = {
    score: 0,
    username: '',
    timer: 40,
    isPlayerLoggedIn: false,
    gameEnabled: false,
    showResult: false,
    playAgain: false
}

const app = new App({ ...initialGameState });
const root = document.getElementById('root');

// TODO: this is test -- delete

app.score = 40;
app.notify();

root.appendChild(app.container);
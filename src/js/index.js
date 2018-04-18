import '../styles/styles.scss';

/*
    Import components
 */
import App from './components/App';

const initialGameState = {
    score: 0,
    username: null,
    showGameActions: false,
    timer: 40,
    isPlayerLoggeIn: false,
    gameEnabled: false
}

const app = new App({ ...initialGameState });
const root = document.getElementById('root');

root.appendChild(app.container);
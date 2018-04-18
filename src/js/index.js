import '../styles/styles.scss';

/*
    Import components
 */
import Game from './components/Game';

const game = new Game();
game.render();

game.userName = 'new username';
game.score = '50'
game.notify();
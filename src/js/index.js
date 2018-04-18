import '../styles/styles.scss';

/*
    Import components
 */
import Game from './components/Game';

const game = new Game();
game.render();


// some tests:
game.score = 40;
game.notify();
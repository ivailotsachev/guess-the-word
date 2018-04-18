import '../styles/styles.scss';

/*
    Import components
 */
import App from './components/App';

const app = new App();
const root = document.getElementById('root');

root.appendChild(app.container);
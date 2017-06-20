import ReactDOM from 'react-dom';
import {TodoApp} from './TodoApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(TodoApp, document.getElementById('root'));
registerServiceWorker();
import ReactDOM from 'react-dom';
import copal from 'copal';
import * as actions from './actions';
import view from './view/App';

export const TodoApp = copal(view, actions);
ReactDOM.render(TodoApp, document.getElementById('root'));
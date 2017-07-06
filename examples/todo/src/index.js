import ReactDOM from 'react-dom';
import view from './view';
import copal from 'copal';
import * as actions from './actions';

export const TodoApp = copal(view, actions);

ReactDOM.render(TodoApp, document.getElementById('root'));
import ReactDOM from 'react-dom';
import copal from 'copal';
import * as actions from './actions/index';
import view from './view/index';

export const TodoApp = copal(view, actions);

ReactDOM.render(TodoApp, document.getElementById('root'));
import ReactDOM from 'react-dom';
import copal from 'copal';
import * as actions from './actions';
import view from './view';

const RedditApp = copal(view, actions);
ReactDOM.render(RedditApp, document.getElementById('root'));
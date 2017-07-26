import React from 'react';
import ReactDOM from 'react-dom';
import copal from 'copal';

export const TodoApp = copal(
    (state, actions) =>
        <div>
            <button onClick={actions.decrement}>-</button>
            <div>{state.value}</div>
            <button onClick={actions.increment}>+</button>
        </div>
    ,  
    {
        initialize: a => a.map( s => ({value: 0})),
        increment: a => a.map( s => ({value: s.value + 1})),
        decrement: a => a.map( s => ({value: s.value - 1})),
    }
)

ReactDOM.render(TodoApp, document.getElementById('root'));
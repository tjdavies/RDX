import React from 'react';
import './App.css';
import Delay from './Delay';
import RDXReact from './RDXReact';

//reducer
const changeValue = delta => s => ({value:s.value + delta })

//side effect
const AsyncSideEffect = (s, actions) => {
  return Delay(1000).then( actions.increment )
}

//actions
const actions = {
  initalise: a => a.map(s => ({value:1})),
  increment: a => a.map(changeValue(1)),
  decrement: a => a.map(changeValue(-1)),
  increaseBy: (a, delta) => a.map(changeValue(delta)),
  async: a => a.addEffect(AsyncSideEffect),
  asyncTwo: a => a.chain(actions.decrement).chain(actions.async),
}

function render(state, actions){
  return <div className="App">
    <p>RDX</p>
    <button onClick={actions.increment} > UP </button>
    <button onClick={actions.decrement} > DOWN </button>
    <button onClick={() => actions.increaseBy(2)} > UP TWO </button>
    <button onClick={actions.async} > ASYC </button>
    <button onClick={actions.asyncTwo}> CHAINED ASYNC </button>
    <p>{state.value}</p> 
  </div>
}

export const App = RDXReact(render, actions )

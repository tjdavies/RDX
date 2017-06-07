import React from 'react';
import './App.css';
import Delay from './Delay';
import RDX from './RDX';

const initState = {
  value:1
}

const AsyncSideEffect = (s, actions) => {
  return Delay(1000).then( actions.increment )
}

const actions = {
  increment: a => a.map(s => ({ value:s.value + 1 })),
  decrement: a => a.map(s => ({ value:s.value - 1 })),
  increaseBy: a => a.map((s, delta) => ({value:s.value + delta })),
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

export const App = RDX(initState, render, actions )

import React, { Component } from 'react';
import './App.css';
import HOC from './HOC';

const initState = {
  value:1
}

const actions = {
  increment: s => s.value ++,
  decrement: s => s.value --,
  increaseBy: (s, delta) => s.value += delta
}

function render(state, actions){
  return <div className="App">
    <p>HOC</p>
    <button onClick={actions.increment} > UP </button>
    <button onClick={actions.decrement} > DOWN </button>
    <button onClick={() => actions.increaseBy(2)} > UP TWO </button>
    <p>{state.value}</p> 
  </div>
}

export default class App extends Component {
  render() {
    return HOC( initState, render, actions )
  }
}


/// next up find a nice way to do async

const promiseDelay = (wait) => {
  return new Promise( (success) => {
       setInterval(success, wait);
    }
  ) 
}

const AsyncSideEffect = (s) => {
  return promiseDelay(1000).then( () => null )
}
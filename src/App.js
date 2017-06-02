import React, { Component } from 'react';
import './App.css';
import HOC from './HOC';

export default class App extends Component {
  render() {
    return HOC({value:1}, makeActions, render)
  }
}

function increment(s){
   s.value ++;
   return s
}

function decrement(s){
   s.value --;
   return s
}

const increaseBy = (s,delta) => {
   s.value += delta;
   return s
}

const AsyncSideEffect = (s) => {
  return promiseDelay(1000).then( () => increment )
}

function makeActions(enactionate){
  return {
    increment: enactionate(increment),
    decrement: enactionate(decrement),
    increaseBy: enactionate(increaseBy),
    async: enactionate(null, AsyncSideEffect)
  }
}

function render(state, actions){
  return <div className="App">
    <p>HOC</p>
    <button onClick={actions.increment} > UP </button>
    <button onClick={actions.decrement} > DOWN </button>
    <button onClick={() => actions.increaseBy(2)} > UP TWO </button>
    <button onClick={actions.async} > ASYNC </button>
    <p>{state.value}</p> 
  </div>
}

const promiseDelay = (wait) => {
  return new Promise( (success) => {
       setInterval(success, wait);
    }
  ) 
}
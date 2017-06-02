import React, { Component } from 'react';
import './App.css';
import HOC from './HOC';

export default class App extends Component {
  render() {
    return HOC({value:1}, render)
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

const increaseBy = (delta) => (s) => {
   s.value += delta;
   return s
}

const AsyncSideEffect = (s) => {
  return promiseDelay(1000).then( () => increment )
}

function render(state, dispatch){
  return <div className="App">
    <p>HOC</p>
    <button onClick={() => dispatch(increment)} > UP </button>
    <button onClick={() => dispatch(decrement)} > DOWN </button>
    <button onClick={() => dispatch(increaseBy(2))} > UP TWO </button>
    <button onClick={() => dispatch(null, AsyncSideEffect)} > ASYNC </button>
    <p>{state.value}</p> 
  </div>
}

const promiseDelay = (wait) => {
  return new Promise( (success) => {
       setInterval(success, wait);
    }
  ) 
}
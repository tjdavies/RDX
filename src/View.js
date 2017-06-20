import './App.css';
import React from 'react';

export default function view(state, actions){
  return <div className="App">
    <p>RDX TODO</p>
    <button onClick={() => actions.addTodo()} > + </button>
    <div>{state.todos.map(Todo(actions))}</div> 
  </div>
}

const Todo = actions => todo => 
  <div key={todo.id} className="Todo">
    <div>
      <label className="Field" >Title</label>
      <p onClick={() => actions.removeTodo(todo)}>X</p>
    </div>
    <p className="Field" type="input"></p>
  </div> 
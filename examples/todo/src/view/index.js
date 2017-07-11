import React from 'react';
import AddTodo from './AddTodo';
import Footer from './Footer';
import TodoList from './TodoList';

export default function view(state, actions){
  return <div>
    <AddTodo addTodo={actions.addTodo} />
    <TodoList todos={getVisibleTodos(state.todos, state.filter)} onTodoClick={actions.compleatTodo} />
    <Footer onFilterClick={actions.setFilter} activeFilter={state.filter} />
  </div>
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
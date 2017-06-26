import './App.css';
import React from 'react';

export default function view(state, actions){
  return <div>
    <AddTodo addTodo={actions.addTodo} />
    <TodoList todos={getVisibleTodos(state.todos, state.filter)} onTodoClick={actions.compleatTodo} />
    <Footer onFilterClick={actions.setFilter} activeFilter={state.filter} />
  </div>
}

const AddTodo = ({addTodo}) => {
  let input;
  return <div>
    <form onSubmit={e => {
      e.preventDefault()
      if (!input.value.trim()) {
        return
      }
      addTodo(input.value)
      input.value = ''
    }}>
      <input ref={node => {
        input = node
      }} />
      <button type="submit">
        Add Todo
      </button>
    </form>
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

const Footer = ({onFilterClick, activeFilter}) => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL" onClick={onFilterClick} activeFilter={activeFilter} >
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE" onClick={onFilterClick} activeFilter={activeFilter} >
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED" onClick={onFilterClick} activeFilter={activeFilter} >
      Completed
    </FilterLink>
  </p>
)

const FilterLink = ({ activeFilter, children, onClick, filter }) => {
  if (activeFilter === filter) {
    return <span>{children}</span>
  }
  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick(filter)
       }}
    >
      {children}
    </a>
  )
}

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)
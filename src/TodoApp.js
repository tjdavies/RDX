import view from './View';
import RDXReact from './RDXReact';

//reducer
const init = s => ({
  idCount: 0,
  todos:[]
})

const addTodo = s => ({
  idCount: s.idCount + 1,
  todos: [...s.todos, {id:s.idCount + 1, title:"", body:""} ]
})

const removeTodo = todo => s => ({
  ...s,
  todos: s.todos.filter( t => t.id !== todo.id )
})

//actions
const actions = {
  initalise: a => a.map(init),
  addTodo: a => a.map(addTodo),
  removeTodo: (a,todo) => a.map(removeTodo(todo)),
}

export const TodoApp = RDXReact(view, actions);

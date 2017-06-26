import view from './View';
import RDXReact from './RDXReact';

//reducer
const init = s => ({
  idCount: 0,
  todos:[],
  filter: "SHOW_ALL"
})

const addTodo = text => s => ({
  idCount: s.idCount + 1,
  todos: [...s.todos, {id:s.idCount + 1, text:text, completed:false} ]
})

const compleatTodo = id => s => ({
  ...s,
  todos: s.todos.map( markCompleated(id) )
})

const markCompleated = id => t => {
  if(t.id === id){
    t.completed = !t.completed ;
  }
  return t;
}

const setFilter = filter => s => ({
  ...s,
  filter: filter
})



//actions
const actions = {
  initalise: a => a.map(init),
  addTodo: (a,text) => a.map(addTodo(text)).log(),
  compleatTodo: (a, id) => a.map(compleatTodo(id)),
  setFilter: (a, filter) => a.map(setFilter(filter))
}

export const TodoApp = RDXReact(view, actions);

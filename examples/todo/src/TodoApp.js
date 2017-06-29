import view from './View';
import RDXReact from 'rdx';

//reducer
const init = state => ({
  idCount: 0,
  todos:[],
  filter: "SHOW_ALL"
})

const addTodo = text => state => ({
  idCount: state.idCount + 1,
  todos: [...state.todos, 
    {
      id:state.idCount + 1,
      text:text,
      completed:false
    }
  ]
})

const compleatTodo = id => state => ({
  ...state,
  todos: state.todos.map( todo => 
    (todo.id === id) ? {...todo, completed: !todo.completed} : todo
  )
})

const setFilter = filter => state => ({
  ...state,
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

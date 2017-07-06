export const init = state => ({
  idCount: 0,
  todos:[],
  filter: "SHOW_ALL"
})

export const addTodo = text => state => ({
  idCount: state.idCount + 1,
  todos: [...state.todos, 
    {
      id:state.idCount + 1,
      text:text,
      completed:false
    }
  ]
})

export const compleatTodo = id => state => ({
  ...state,
  todos: state.todos.map( todo => 
    (todo.id === id) ? {...todo, completed: !todo.completed} : todo
  )
})

export const setFilter = filter => state => ({
  ...state,
  filter: filter
})

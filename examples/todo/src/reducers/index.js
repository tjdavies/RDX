export function init(state) {
  return {
    idCount: 0,
    todos:[],
    filter: "SHOW_ALL"
  }
}

export function addTodo(state, text) {
  return {
    idCount: state.idCount + 1,
    todos: [...state.todos, 
      {
        id:state.idCount + 1,
        text:text,
        completed:false
      }
    ]
  }
}

export function compleatTodo(state, id){
  return {
    ...state,
    todos: state.todos.map( todo => 
      (todo.id === id) ? {...todo, completed: !todo.completed} : todo
    )
  }
}

export function setFilter(state, filter){
  return {
    ...state,
    filter: filter
  }
}

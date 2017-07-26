import * as reducers from "./reducers"

// look at the reddit example to see how more complex actions add side effects and can be composed

export function initialize(a){
  return a.map(reducers.init)
}

export function addTodo(a){
  return a.map(reducers.addTodo)
}

export function compleatTodo(a){
  return a.map(reducers.compleatTodo)
}

export function setFilter(a){
  return a.map(reducers.setFilter)
}

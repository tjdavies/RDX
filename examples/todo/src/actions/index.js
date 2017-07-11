import * as reducers from "../reducers/index"

export function initalise(a){
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

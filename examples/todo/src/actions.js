import * as reducers from "./reducers"

export function initalise(a){
  return a.map(reducers.init)
}

export function addTodo(a,text){
  return a.map(reducers.addTodo(text))
}

export function compleatTodo(a,id){
  return a.map(reducers.compleatTodo(id))
}

export function setFilter(a,filter){
  return a.map(reducers.setFilter(filter))
}

import * as reducers from "./reducers"
import {loadReddit} from "./effects"

export function initialize(a){
  return a.map(reducers.initalise)
    .chain(refresh)
}

export function selectReddit(a){
  return a.map(reducers.setSelectedReddit)
    .chain(refresh)
}

export function refresh(a){
  return a.map(reducers.setStatusLoading)
    .addEffect(loadReddit)
}

export function recivedPosts(a){
  return a.map(reducers.setStatusLoaded)
}

export function recivedError(a){
  return a.map(reducers.setStatusError)
}

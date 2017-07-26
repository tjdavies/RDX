import * as states from './stateConsts';

const LOADING = {
  type: states.LOADING
} 

const ERROR = {
  type: states.ERROR
} 

export function initialize(state) {
  return {
    reddits: ['reactjs', 'frontend', 'sdfsadfkl'],
    selectedReddit: 'reactjs',
    status: LOADING
  }
}

export function setStatusLoaded(state, posts){
  return {
    ...state,
    status: {
      type: states.LOADED,
      posts: posts
    }    
  }
}

export function setSelectedReddit(state, selectedReddit){
  return {
    ...state,
    selectedReddit: selectedReddit
  }
}

export function setStatusLoading(state) {
  return {
    ...state,
    status: LOADING 
  };
}

export function setStatusError(state) {
  return {
    ...state,
    status: ERROR
  };
}

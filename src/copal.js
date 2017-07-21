export function createStore(rawActions, middleware = (f) => f  ){
    let state = {};
    let actions = {};
    let currentListeners = []
    let nextListeners = currentListeners

    const dispatch = (name, ...args) => {
      const response = rawActions[name](action({ state, effects: [] },...args),...args).fold();
      setState(response.state);
      response.effects.map(e => e(response.state, actions));
      return state;
    }

    const makeAction = (name) => (...args) => middleware(dispatch)(name, ...args)
    
    for (var key in rawActions) {
      actions[key] = makeAction(key);
    }

    const getState = () => {
      return state
    }

    const setState = (newState) => {
      state = newState
      const listeners = currentListeners = nextListeners
      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i]
        listener()
      }
    }
  
    function subscribe(listener) {
      let isSubscribed = true
      nextListeners.push(listener)
      return function unsubscribe() {
        if (!isSubscribed) {
          return
        }
        isSubscribed = false
        const index = nextListeners.indexOf(listener)
        nextListeners.splice(index, 1)
      }
    }
   
    return {
      actions,
      getState,
      subscribe,
      dispatch,
      setState
    };
}

function action(s,...args) {
  return {
    map: f => action({ effects: s.effects, state: f(s.state, ...args) }),
    addEffect: e => action({ effects: [...s.effects, e], state: s.state }),
    chain: a => a(action(s), ...args),
    log: () => action(log(s)),
    fold: () => s,
  };
}

export function log(t){
    console.log(t);
    return t;
}
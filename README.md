# RDX 

Simply powerfull

### Why?

* No action creators or action objects
* Async is built in
* Pure functional composable code

#### Simple app

```javascript
const initState = {
  value:1
}

const actions = {
  increment: a => a.map(s => ({ value:s.value + 1 })),
  decrement: a => a.map(s => ({ value:s.value - 1 }))
}

function render(state, actions){
  return <div>
    <button onClick={actions.increment} > UP </button>
    <p>{state.value}</p> 
  </div>
}

export const App = RDX(initState, render, actions )
```

#### Handling async

Actions are pure function that return side effects. This makes testing simple and make the code easy to follow. 

```javascript
const AsyncSideEffect = (s, actions) => {
  return Delay(1000).then( actions.increment )
}

const actions = {
  increment: a => a.map(s => ({ value:s.value + 1 })),
  async: a => a.addEffect(AsyncSideEffect)
}
```


#### Whats with the map and addEffect

actions are effectivly function that take and return 

```javascript
{ state:{}, effects:[]}
```

In its raw form working with this structure is a bit clumsy. Wrapping it in a helper takes the pain away but still keeps it pure. 
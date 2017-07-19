# Copal

### Why?

* Stripped down simplicty
* Pure functional composable code
* No boilerplate
* Async is built in
* Easy to unit test

#### Simple app

```jsx
const actions = {
  initialise: a => a.map(s => ({value:1})),
  increment: a => a.map(s => ({ value:s.value + 1 })),
  decrement: a => a.map(s => ({ value:s.value - 1 }))
}

const render = (state, actions) => {
  return <div>
    <button onClick={actions.increment} > UP </button>
    <button onClick={actions.decrement} > DOWN </button>
    <p>{state.value}</p> 
  </div>
}

export const App = copal(render, actions )
```

#### Handling async

```jsx
const AsyncSideEffect = (state, actions) => {
  return Delay(1000).then( actions.increment )
}

const actions = {
  increment: a => a.map(s => ({ value:s.value + 1 })),
  async: a => a.addEffect(AsyncSideEffect)
}
```

### Architecture
Copal is much like Redux only simpler. All the examples here use React to render but in therory its not limited to just react.

There are just two concepts in Copal actions and effects. Both are functions.

![Copal](http://i.imgur.com/Ibyvi6A.png?3)

#### Actions

Are pure functions that take the current app state and update it much like reducers in redux. However they differ slighlty in that they can also return a list of side effects to be run. This is a crutial diffrence as it means its easy follow that when Action A happens it will change the state like this AND trigger these side effects. As these functions are pure unit testing them is easy. These functions will make up the core of your app.

#### Effects

Are where all the untidy side effects and async stuff takes place. They recive the app state and the actions which they can call. Unlike redux there is no need to dipatch an 'Action' object you can just call the action functions direclty. Effects should not really contain any app logic. The view is just a special kind of effect that is called every action.

#### Wait! 

What with the a, map and addEffect

actions are effectivly functions that take this form

```javascript
({ state:{}, effects:[]}) => ({ state:{}, effects:[]} )
```

In its raw form working with this structure is a bit clumsy. Wrapping it in a helper takes the pain away but still keeps it pure. 

- map: accepts a function that updates the app state
- addEffect: adds an effect to the list of effects
- chain: composes actions together
- log: prints the current state and effects list
- fold: returns the raw data. (only really needed for testing)




## Examples

##### Todo 
[![Edit Copal - todo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/tjdavies/copal/tree/master/examples/todo)

##### Reddit client 
[![Edit Copal - reddit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/tjdavies/copal/tree/master/examples/reddit)


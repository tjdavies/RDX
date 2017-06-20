export default function RDX(rawActions, update){
    let state = {};
    let actions = {};

    const makeAction = (a,name) => (...args) => {
      log(name)
      const response = a(Action({ state, effects: [] }),...args).fold();
      state = response.state
      response.effects.map(e => e(response.state, actions));
      update(state, actions)
    };

    for (var key in rawActions) {
        actions[key] = makeAction(rawActions[key],key);
    }
    return actions;
}

function Action(s) {
  return {
    map: f => Action({ effects: s.effects, state: f(s.state) }),
    addEffect: e => Action({ effects: [...s.effects, e], state: s.state }),
    chain: (a, ...args) => a(Action(s), ...args),
    log: () => Action(log(s)),
    fold: () => s,
  };
}

export function log(t){
    console.log(t);
    return t;
}
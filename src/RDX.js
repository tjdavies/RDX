export default function RDX(rawActions, update){
    let state = {};
    let actions = {};

    const makeAction = a => (...args) => {
      const response = a(
        Action({ state, effects: [] }),
        ...args,
      ).fold();
      state = response.state
      response.effects.map(e => e(response.state, actions));
      update(state, actions)
    };

    for (var key in rawActions) {
        actions[key] = makeAction(rawActions[key]);
    }

    return actions;
}

function Action(s) {
  return {
    map: f => Action({ effects: s.effects, state: f(s.state) }),
    addEffect: e => Action({ effects: [...s.effects, e], state: s.state }),
    chain: (a, ...args) => a(Action(s), ...args),
    log,
    fold: () => s,
  };
}

export function log(l) {
    console.log(l);
    return l;
}
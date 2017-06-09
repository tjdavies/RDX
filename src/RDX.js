import React, { Component } from 'react';

class RDXClass extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const makeAction = a => (...args) => {
      const response = a(
        Action({ state: this.state, effects: [] }),
        ...args,
      ).fold();
      this.setState(response.state);
      response.effects.map(e => e(response.state, this.actions));
    };

    const enactionate = actions => {
      const newActions = {};
      for (var key in actions) {
        newActions[key] = makeAction(actions[key]);
      }
      return newActions;
    };

    this.actions = enactionate(props.actions);
  }

  componentWillMount() {
    if (this.actions['initalise']) {
      this.actions['initalise']();
    }
  }

  render() {
    return this.props.render(this.state, this.actions);
  }
}

export default function RDX(render, actions) {
  return <RDXClass actions={actions} render={render} />;
}

function Action(s) {
  return {
    map: f => Action({ effects: s.effects, state: f(s.state) }),
    addEffect: e => Action({ effects: [...s.effects, e], state: s.state }),
    chain: (a, ...args) => a(Action(s), ...args),
    log: a => {
      console.log(s);
      return a;
    },
    fold: () => s,
  };
}
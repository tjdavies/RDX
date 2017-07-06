import React, { Component } from 'react';
import {createStore} from './copal';

class CopalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.actions = createStore(props.actions, s => this.setState(s) );
  }

  componentWillMount() {
    if (this.actions['initalise']){
      this.actions['initalise']();
    }
  }

  render() {
    return this.props.render(this.state, this.actions);
  }
}

export default function copal(render, actions) {
  return <CopalComponent actions={actions} render={render} />;
}
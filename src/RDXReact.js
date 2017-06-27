import React, { Component } from 'react';
import RDX from './RDX';

class RDXClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.actions = RDX(props.actions, s => this.setState(s) );
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

export default function RDXReact(render, actions) {
  return <RDXClass actions={actions} render={render} />;
}
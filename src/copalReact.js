import React, { Component } from 'react';
import {createStore} from './copal';

class CopalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    var devTools = window.devToolsExtension && window.devToolsExtension.connect();
    let debuggerHook = (dispatch) => (name,...args) => {
      const newState = dispatch(name, ...args)
      devTools.send({type:name,...args}, newState)
    }
    this.store = createStore(props.actions, (devTools) ? debuggerHook : undefined);
    if(devTools){
      this.unsubscribe = devTools.subscribe( (message) => {
        if(message.type === 'DISPATCH'){
          this.store.setState(JSON.parse(message.state));
        }
      })
      devTools.init(this.store.getState());
    }  
    this.store.subscribe(
      () => this.setState(this.store.getState())
    )
  }

  componentWillMount() {
    if (this.store.actions['initalise']){
      this.store.actions['initalise']();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.props.render(this.state, this.store.actions);
  }
}

export default function copal(render, actions) {
  return <CopalComponent actions={actions} render={render} />;
}
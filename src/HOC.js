import React, { Component } from 'react';

class HighOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = props.initState
        
        const makeAction = (a) => 
            (...args) => this.setState( s =>  a(s,...args))

        const enactionate = (actions) => {
            const newActions = {}  
            for (var key in actions) {
                newActions[key] = makeAction(actions[key])
            }
            return newActions;
        } 
        
        this.actions = enactionate(props.actions);    
    }

    render() {
        return this.props.render(this.state, this.actions);
    }
}


export default function HOC(initState, render, actions ){
    return <HighOrderComponent initState={initState} actions={actions} render={render} />
}
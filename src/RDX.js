import React, { Component } from 'react';

class RDXClass extends Component {

    constructor(props) {
        super(props);
        this.state = props.initState
        
        const makeAction = (a) => 
            (...args) => {
                const response = a(Action({state:this.state, effects:[]},...args), ...args).fold();
                this.setState( response.state );
                response.effects.map(
                    e => e(response.state, this.actions)
                )
            }

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


export default function RDX(initState, render, actions ){
    return <RDXClass initState={initState} actions={actions} render={render} />
}

function Action(s, ...args){
    return {
        map: f => Action( {effects:s.effects, state:f(s.state, ...args)} ) ,
        addEffect: e => Action(addEffect(s,e)) ,
        fold: () => s
    }
}

function addEffect(s, e){
    s.effects.push(e)
    return {state:s.state, effects:s.effects}
}
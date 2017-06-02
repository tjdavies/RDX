import React, { Component } from 'react';

class HighOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = props.initState
        const dispatch = (reducer, sideEffect) => {
            if(reducer){
                this.setState(reducer) 
            }
            if(sideEffect){
                sideEffect(this.state).then((r) => this.setState(r))
            }
        }

        const enactionate = (f,side) =>
            (...args) => {
            const curriedF = (f) ? (s) => f(s,...args) : null;
            dispatch(curriedF, side)
        }  
        
        this.actions = props.makeActions(enactionate)
    }

    render() {
        return this.props.render(this.state, this.actions);
    }
}


export default function HOC(initState, makeActions, render){
    return <HighOrderComponent initState={initState} makeActions={makeActions} render={render} />
}
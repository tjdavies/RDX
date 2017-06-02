import React, { Component } from 'react';

class HighOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = props.initState
        this.dispach = (reducer, sideEffect) => {
            if(reducer){
                this.setState(reducer) 
            }
            if(sideEffect){
                sideEffect(this.state).then((r) => this.setState(r))
            }
        }
    }

    render() {
        return this.props.render(this.state, this.dispach);
    }
}


export default function HOC(initState, render){
    return <HighOrderComponent initState={initState} render={render} />
}
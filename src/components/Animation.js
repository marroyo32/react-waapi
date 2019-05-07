import React, { Component } from 'react';
import Canvas from './Canvas';

class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: 0,
        };
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }
    
    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
        this.interval = setInterval(() => this.setState(prevState => ({ time: prevState.time + 1 })), 50);
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
        clearInterval(this.interval);
    }

    updateAnimationState() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
    
    render() {
        return <Canvas time={this.state.time} state={this.props.state} />
    }
}

export default Animation;
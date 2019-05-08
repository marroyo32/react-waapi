import React, { Component } from 'react';
import Canvas from './Canvas';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: 0,
        };
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }
    
    componentDidMount() {        
        this.rAF = requestAnimationFrame(this.updateAnimationState);
        this.interval = setInterval(() => this.setState(prevState => ({ time: prevState.time + 1 })), 10);
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
        clearInterval(this.interval);
    }

    updateAnimationState() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
        // if (this.props.state.paused) {
        //     console.log(`paused`, this.state.time);
        //     cancelAnimationFrame(this.rAF);
        //     clearInterval(this.interval);
        // } else {
        //     console.log('play', this.state.time);
        //     this.rAF = requestAnimationFrame(this.updateAnimationState);
        //     this.interval = setInterval(() => this.setState(prevState => ({ time: prevState.time + 1 })), 1000);
        // }
    }
    
    render() {
        return <Canvas time={this.state.time} state={this.props.state} />
    }
}

export default Animation;
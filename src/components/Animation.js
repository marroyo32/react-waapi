import React, { Component } from 'react';
import Canvas from './Canvas';
import styled from 'styled-components';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: 0,
            paused: true,
            pausedTime: 0,
        };
    }

    handlePause = () => {        
        this.setState(({ paused }) => ({ paused: !paused }))
        // this.animate();
    }

    __btnIcon = () => {
        if (this.state.paused) {
            return <p style={{margin: '0'}}>&#9654;</p>   
        } else {
            return <p style={{margin: '0'}}>&#9616;&#9616;</p> 
        }
    }
    
    componentDidMount() {        
        setInterval(() => {
            if (this.state.paused === false && this.state.time < 1000) {
                this.setState(prevState => ({ 
                    time : prevState.time + 1, 
                }));
            } else if (this.state.time === 1000) {
                this.setState({
                    time: 0,
                    paused: true,
                })
            } }, 10);            
    }
    
    render() {
        return (
            <div>
                <Canvas time={this.state.time} state={this.props.state} />
                <Controller>
                    <Button onClick = { this.handlePause }>
                        {
                            this.__btnIcon()
                        }
                    </Button>
                    <Range type="range" min="0" max="100" />
                </Controller>
            </div>
        );
    }
}

export default Animation;


const Controller = styled.div`
    width: 26rem;
    margin-left: 13rem;
    display: flex;
`;

const Range = styled.input`
    width: 16rem;
    display: inline-block;
    margin: .5rem;
    float: left;
`;

const Button = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    background: transparent;
    border: none;
    color: #333;
    line-height: 1;
    margin: .5rem;
    text-align: center;
    padding: .2rem .4rem .2rem .4rem;
    border-radius: .3rem;
    transition: background .15s linear, color .15s linear;
    border: 1px solid #333;
    float: left;
    width: 35px;

    &.active {
    background: #333;
    color: $light;
    }
`;
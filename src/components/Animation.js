import React, { Component } from 'react';
import Canvas from './Canvas';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: 0,
            paused: true,
            startCreate: false,
            intervalTime: 10,
            percent: 0,
            loading: false
        };
    };

    handlePause = () => {        
        this.setState(({ paused }) => ({ paused: !paused }));
    };

    __btnIcon = () => {
        if (this.state.paused) {
            return <p style={{margin: '0'}}>&#9654;</p>   
        } else {
            return <p style={{margin: '0'}}>&#9616;&#9616;</p> 
        }
    }

    handleCreate = (e) => {
        e.preventDefault();
        this.setState({
            time: 0,
            paused: false,
            startCreate: true,
            intervalTime: 40,
            loading: true,
        });
    }
    
    componentWillMount() {        
        setInterval(() => {
            if (this.state.paused === false && this.state.time < 1000) {
                this.setState(prevState => ({ 
                    time : prevState.time + 1, 
                    percent : this.state.time,
                }));
            } else if (this.state.time === 1000) {
                this.setState({
                    time: 0,
                    paused: true,
                    loading: false,
                    percent: 0,
                })
            } 
        }, this.state.intervalTime);            
    };
    
    render() {
        return (
            <div style={{width: '40%', marginTop: '4rem'}}>
                <Canvas time={this.state.time} state={this.props.state} startCreate = {this.state.startCreate} />
                <ClipLoader
                    css={{
                        display: 'block',
                        margin: '0 auto',
                        borderColor: 'red',
                        position: 'absolute',
                        top: '50%',
                        left: '24%'
                    }}
                    sizeUnit={"px"}
                    size={100}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
                <Controller>
                    <Button onClick = { this.handlePause }>
                        {
                            this.__btnIcon()
                        }
                    </Button>
                    <Range type="range" min="0" max="1000" value={this.state.percent} />
                </Controller>
                <CreateButton onClick={(e) => this.handleCreate(e)}>Create Movie</CreateButton>
            </div>
        );
    }
}

export default Animation;


const Controller = styled.div`
    width: 36rem;
    margin-left: 9rem;
    display: inline-block;
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

const CreateButton = styled.button`
    width: 120px;
    height: 40px;
    text-align: center;
    padding: .2rem;
    margin: 1rem;
    margin-left: 16rem;
    background-color: #fff;
    font-size: 15px;
    border-radius: 4px;
    border: 1px solid black;
`;
import React, { Component } from 'react';
import { Animated } from 'react-web-animation';
import Edit from './Edit';
import styled from 'styled-components';

export default class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textFirst: '5G Hype or reality',
            imageURLFirst: `
            `,
            textSecond: `5G promises to deliver a much better experience with higher speeds, lower latency and higher               capacities, which could prove useful as the world becomes much more connected.`,
            imageURLSecond: '',
            textThird: `Will this move from 4G to 5G disrupt the industry structure?`,
            imageURLThird: '',
        }
    }

    getKeyFramesFirst() {
        return [
            {offset: 0, margin: "0px 0px 0px -370px"},
            {offset: 1/4, margin: "0px 0px 0px 0px"},
            {offset: 3/4, margin: "0px 0px 0px 0px"},
            {offset: 1, margin: "0px 0px 0px 370px"}
        ];
    }

    getKeyFramesSecond() {
        return [
            {offset: 0, margin: "500px 0px 0px 0px"},
            {offset: 1/20, margin: "150px 0px 0px 0px"},
            {offset: 3/20, margin: "0px 0px 0px 0px"},
            {offset: 1, margin: "0px 0px 0px 370px"}
        ];
    }

    getTiming( duration ) {
        return {
            duration,
            easing: 'ease-in-out',
            delay: 0,
            iterations: Infinity,
            direction: 'alternate',
            fill: 'forwards'
        };
    }

    handleTextChange = ( text ) => {
        this.setState({
            text: text,
        });
    }

    handleImageChange = ( imageURL ) => {
        this.setState({
            imageURLFirst: imageURL,
        })
    }

    componentWillMount () {
    }

    render() {
        return(
            <Wrapper>
                <AnimationView>
                    <Animated.div keyframes={this.getKeyFramesFirst()}
                        timing={this.getTiming(2000)}                        
                        style={{width: '350px', height: `300px`}} >
                        <Text>{this.state.textFirst}</Text>
                        <Img src={this.state.imageURLFirst} />
                        <Blank />
                    </Animated.div>
                    {/* <Animated.div keyframes={this.getKeyFramesSecond()}
                        timing={this.getTiming(6000)}                        
                        style={{width: '350px', height: `300px`}} >
                        <Text>{this.state.textSecond}</Text>
                        <Img src={this.state.imageURLSecond} />
                        <Blank />
                    </Animated.div> */}
                </AnimationView>
                <Edit handleTextChange = {this.handleTextChange} handleImageChange = {this.handleImageChange} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    text-align: center;
`;

const AnimationView = styled.div`
    width: 350px;
    height: 500px;
    float: left;
    margin: 4%;
    border: 2px solid #000;
    overflow: hidden;
`;

const Text = styled.p`
    text-align: center;
    margin-top: 100px;
    height: 40px;
    font-size: 30px;
    font-weight: bold;
`;

const Img = styled.img`
    width: 100%;
    height: 300px;
`;

const Blank = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: white;
    width: 80px;
    height: 50px;
`;
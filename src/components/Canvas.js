import React, { Component } from 'react';
import styled from 'styled-components';

class Canvas extends React.Component {
    constructor(props) {
        super(props);        
        this.canvas = React.createRef();
        this.imageFirst = React.createRef();
        this.imageSecond = React.createRef();
        this.imageThird = React.createRef();
    }
    
    componentDidUpdate() {
        const {time} = this.props;
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const imgFirst = this.imageFirst.current;
        const imgSecond = this.imageSecond.current; 
        const imgThird = this.imageThird.current;
        ctx.save();
        ctx.beginPath();
        // ctx.clearRect(0, 0, width, height);
        // ctx.translate(width/2, height/2 );
        // ctx.rotate(time * Math.PI / 180);
        // ctx.fillStyle = '#4397AC';
        // ctx.fillRect(-width/4, -height/4, width/2, height/2);
        ctx.restore();
        // imgFirst.onload = () => {
        //     console.log('h');
            // ctx.save();
            // ctx.beginPath();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(0.1*time, 0 );
            // ctx.rotate(time * Math.PI / 180);
            ctx.drawImage(imgFirst, 0, 150, 350, 300);
            ctx.font = "20px sans-serif";
            ctx.fillText(this.props.state.textFirst, 10, 50);
        // }
    }
    
    render() {
        let state = this.props.state;
        if(state) {
            return (
                <div>
                    <AnimationView ref={this.canvas} width={'350px'} height={'500px'} ></AnimationView>
                    <ImgFirst src={state.imageURLFirst} ref={this.imageFirst}/>
                    <ImgSecond src={state.imageURLSecond} ref={this.imageSecond}/>
                    <ImgThird src={state.imageURLThird} ref={this.imageThird}/>
                </div>            
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Canvas;

const AnimationView = styled.canvas`
    float: left;
    margin: 4%;
    margin-top: 20%;
    border: 2px solid #000;
`;

const ImgFirst = styled.img`
    display: none;
`;

const ImgSecond = styled.img`
    display: none;
    margin-top: 10px;
`;

const ImgThird = styled.img`
    display: none;
    margin-top: 90px;
`;
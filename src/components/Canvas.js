import React, { Component } from 'react';
import styled from 'styled-components';

class Canvas extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            paused: false,
        };       
        this.canvas = React.createRef();
        this.imageFirst = React.createRef();
        this.imageSecond = React.createRef();
        this.imageThird = React.createRef();
    }
    
    componentDidUpdate() {
        this.drawAnimation();
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }

    drawAnimation() {
        if(this.props.state.paused){return;}
        const {time} = this.props;
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const imgFirst = this.imageFirst.current;
        const imgSecond = this.imageSecond.current; 
        const imgThird = this.imageThird.current;
        // ctx.save();
        ctx.beginPath();
        // ctx.restore();
        if(time < 200) {
            ctx.clearRect(-350, 0, width, height);
            if (time < 50) {
                ctx.translate(7, 0 );
            } else if(50 <= time && time < 150) {
                ctx.translate(0, 0 );
            } else {
                ctx.translate(7, 0 );
            }
            ctx.drawImage(imgFirst, -343, 150, 350, 300);
            ctx.font = "20px sans-serif";
            this.wrapText(ctx, this.props.state.textFirst, -333, 80, 300, 20);
        } else if (time == 200) {
            console.log(`200`);
            ctx.translate(-693, 0);
        } else if (200 < time && time < 800) {
            console.log(`8000`,time);            
            ctx.clearRect(0, 500, width, height);
            if (time < 250) {
                console.log(`less than 250`,time);
                ctx.translate( 0, -10 );
            } else if(250 <= time && time < 750) {
                ctx.translate( 0, 0 );
            } else {
                ctx.translate( 0, -10 );
            }
            ctx.drawImage(imgSecond, 0, 690, 350, 300);
            ctx.font = "20px sans-serif";
            this.wrapText(ctx, this.props.state.textSecond, 10, 550, 300, 20);
        } else if (time == 800) { 
            ctx.translate(0, 500);
        } else if (800 < time && time < 1000) {
            console.log(`8000`,time);            
            ctx.clearRect(0, 0, width, height);
            if (time < 850) {
                console.log(`less than 250`,time);
                ctx.translate( 0, 10 );
            } else if(850 <= time && time < 950) {
                ctx.translate( 0, 0 );
            } else {
                ctx.translate( 0, 10 );
            }
            ctx.drawImage(imgThird, 0, 0, 350, 300);
            ctx.font = "20px sans-serif";
            this.wrapText(ctx, this.props.state.textThird, 10, 350, 300, 20);
        } else {
            return;
        }
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
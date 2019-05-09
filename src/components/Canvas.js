import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'

class Canvas extends Component {
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
        console.log(`time`, time);
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const imgFirst = this.imageFirst.current;
        const imgSecond = this.imageSecond.current; 
        const imgThird = this.imageThird.current;
        const velocityHorizon = width/50;
        const velocityVertical = height/50;
        let counter = time;
        ctx.save();
        ctx.beginPath();
        ctx.restore();
        if(time < 200) {
            ctx.clearRect(-width, 0, width, height);
            if (0 <= time && time < 50) {
                ctx.translate(velocityHorizon, 0 );
            } else if(50 <= time && time < 150) {
                ctx.translate(0, 0 );
            } else if (150 <= time && time < 200) {
                ctx.translate(velocityHorizon, 0 );
            }
            const ratioFirst = width / imgFirst.width;
            ctx.drawImage(imgFirst, -width, 500, imgFirst.width * ratioFirst, imgFirst.height * ratioFirst);
            ctx.font = "40px sans-serif";
            this.wrapText(ctx, this.props.state.textFirst, -555, 380, width*0.8, 35);
        } else if (time === 200) {
            ctx.translate(-width*2, 0);
        } else if (200 < time && time < 800) {
            ctx.clearRect(0, height, width, height*2);
            if (time < 250) {
                ctx.translate( 0, -velocityVertical );
            } else if(250 <= time && time < 750) {
                ctx.translate( 0, 0 );
            } else {
                ctx.translate( 0, -velocityVertical );
            }
            const ratioSecond = width / imgSecond.width;
            ctx.drawImage(imgSecond, 0, height*2 - imgSecond.height*1.5 - velocityVertical, imgSecond.width * ratioSecond, imgSecond.height * 1.5);
            ctx.font = "40px sans-serif";
            this.wrapText(ctx, this.props.state.textSecond, 50, height*2-imgSecond.height*1.5-350, width*0.8, 40);
        } else if (time === 800) { 
            ctx.translate(0, height);
        } else if (800 < time && time < 1000) {
            ctx.clearRect(0, 0, width, height);
            if (time < 850) {
                ctx.translate( 0, velocityVertical );
            } else if(850 <= time && time < 950) {
                ctx.translate( 0, 0 );
            } else {
                ctx.translate( 0, velocityVertical );
            }
            const ratioThird = width/imgThird.width;
            ctx.drawImage(imgThird, 0, 0, imgThird.width * ratioThird, imgThird.height * ratioThird);
            ctx.font = "40px sans-serif";
            this.wrapText(ctx, this.props.state.textThird, 50, imgThird.height * ratioThird + 80, width*0.8, 40);
        } else {
            return;
        } 
        // capture the data URL of the image
        // let data = canvas.toDataURL("image/png");
        // data = 'data=' + encodeURIComponent(data) + '&i=' + counter;
        // axios.post(
        //     'http://localhost:8888/save_animation.php',
        //     data,
        //     { headers: {
        //       'accept-language': 'en_US',
        //       'content-type': 'application/x-www-form-urlencoded'
        //     } }
        //   ).then(response => {
        //     console.log('Post data successfully!');
        //     console.log(response.data);
        //   }).catch(error => console.log(error));
    }
    
    render() {
        let state = this.props.state;
        if(state) {
            return (
                <div>
                    <AnimationView ref={this.canvas} width={'608px'} height={'1080px'} ></AnimationView>
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
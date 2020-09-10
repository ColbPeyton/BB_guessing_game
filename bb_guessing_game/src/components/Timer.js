import React from 'react';

import '../styles/Timer.scss';

class Timer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            totalTime: props.answerTime,
            timeLeft: props.answerTime,
            timer : null,
            color: 'green',
            halfTimeLeft: Math.floor(props.answerTime / 2),
            quaterTimeLeft: Math.floor(props.answerTime / 4),
            animationClass: null
        }
    }


    componentDidMount(){
        // used to check mount status, fixed bug with updating state after unmounting
        this._ismounted = true;
        const timer = setInterval(() => { this.countDown() }, 1000);

        this.setState(
            {timer: timer, animationClass: this.chooseAnimation()});
    }

    componentWillUnmount(){
        this._ismounted = false;
        clearInterval(this.state.timer)
    }

    countDown(){
        let {timeLeft, halfTimeLeft, quaterTimeLeft, color} = this.state;
        if(timeLeft < 1){
            clearInterval(this.state.timer);
            this.timerExpired();
        }

        timeLeft-= 1;

        if(this._ismounted){
            let newColor = this.changeColorBasedOnTimeLeft(color, timeLeft, halfTimeLeft, quaterTimeLeft);
            if(color !== newColor){
                this.setState({color: newColor})
            }
            this.setState({timeLeft: timeLeft})
        }
    }

    changeColorBasedOnTimeLeft(original, time, half, quater){
        let color = original;

        if(time <= half){
            color = 'yellow';
        }

        if(time <= quater){
            color = 'red';
        }

        return color;
    }

    chooseAnimation(){
        switch(this.state.totalTime){
            case '5': 
                return 'hard'
            case '20': 
                return 'easy';
            default:
                return 'medium'
        }
    }

    timerExpired(){
        this.props.didUserAnswerQuestion(false);
    }

    generateTimer(){
        return(
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className={`base-timer__path-remaining blue`}
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                    <circle className={`inner-circle ${this.state.color} ${this.state.animationClass}`} cx="50" cy="50" r="45" />
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">   
                {this.state.timeLeft}               
                </span>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.generateTimer()}
            </div>
        )
    }
}

export default Timer;
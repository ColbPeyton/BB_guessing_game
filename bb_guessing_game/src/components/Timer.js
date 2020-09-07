import React from 'react';

import '../styles/Timer.scss';

class Timer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            timeLeft: props.answerTime,
            timer : null
        }
    }


    componentDidMount(){
        // used to check mount status, fixed bug with updating state after unmounting
        this._ismounted = true;
        const timer = setInterval(() => { this.countDown() }, 1000);
        this.setState({timer: timer});
    }

    componentWillUnmount(){
        this._ismounted = false;
        clearInterval(this.state.timer)
    }

    countDown(){
        let {timeLeft} = this.state;
        if(timeLeft < 1){
            clearInterval(this.state.timer);
            this.timerExpired();
        }

        timeLeft-= 1;

        if(this._ismounted){
            this.setState({timeLeft: timeLeft})
        }
    }

    timerExpired(){
        this.props.didUserAnswerQuestion(false);
        console.log('expired')
    }


    generateTimer(){
        return(
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
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
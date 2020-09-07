import React, { useState, useEffect} from 'react';

import '../styles/Timer.scss';

function Timer(props){

    const [time, setTime] = useState(props.answerTime);

    // Start timer on mount
    useEffect(()=>{
        let t = time;
        const timer = setInterval(() => {
            if(t <= 1){
                clearInterval(timer);
                timerExpired();
            }
            t -= 1;
            setTime(t)
        }, 1000);
        // cleanup if answer was slected before timer finished
        return () => {
            clearInterval(timer);
          };
    },[])


    function timerExpired(){
        props.didUserAnswerQuestion(false);
        console.log('expired')
    }


    function generateTimer(){
        return(
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">   
                {time}               
                </span>
            </div>
        )
    }


    return(
        <div>
            {generateTimer()}
        </div>
    )
}

export default Timer;
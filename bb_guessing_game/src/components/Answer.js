import React from 'react';
import '../styles/Answer.scss';

function Answer(props){

    function handleClick(){
        if(!props.disabled) props.returnUserChoice(props.answer.correct)
    }

    return(
        <div className='answer-button' onClick={()=>{handleClick()}}>
          <p>{props.answer.name}</p>
        </div>
    )
}

export default Answer;
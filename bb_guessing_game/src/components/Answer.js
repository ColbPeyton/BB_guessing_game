import React from 'react';
import '../styles/Answer.scss';

function Answer(props){

    function handleClick(){
        if(!props.disabled) props.returnUserChoice(props.answer.correct)
    }

    function addClassStyling(){
        if(props.disabled){
            return props.answer.correct
            ? 'correct'
            : 'incorrect';
        }
        return '';
        }

    return(
        <div className={`answer-button ${addClassStyling() }`} onClick={()=>{handleClick()}}>
          <p>{props.answer.name}</p>
        </div>
    )
}

export default Answer;
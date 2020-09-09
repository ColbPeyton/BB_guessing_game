import React from 'react';
import '../styles/AnswerStatus.scss';

function AnswerStatus(props){

    function renderIcon(){
        return props.status
        ? <i className="fas fa-check"></i>
        : <i className="fas fa-times"></i>;
    }
    function decideClass(){
        return props.status
        ? 'correct'
        : 'incorrect';
    }

    return(
        <div className={`answer-status-container ${decideClass()}`}>
            {renderIcon()}
        </div>
    )
}

export default AnswerStatus;
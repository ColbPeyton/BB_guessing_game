import React from 'react';
import '../styles/Header.scss';

function Header(props){

    function addClassBasedOnScore(){

    }

    return(
        <div className={`header-container ${props.score ? '' : 'score-not-shown'}`}>
                <h3 className='logo'>Guess the Quote</h3>
                <h3 className='score'>{props.score}</h3>
        </div>

    )
}

export default Header;
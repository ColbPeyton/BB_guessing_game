import React from 'react';
import Header from './Header';
import logo from '../images/bb_logo.png';
import '../styles/TitleScreen.scss';


function TitleScreen(props){

    function callParentFunction(){
        props.updateActive();
    }

    return(
        <div className='title-screen-container'>
            <div className='title-screen-logo'>
                <Header image={{src: logo, alt: 'Breaking Bad Logo'}}/>
            </div>
            <h2>Guessing Game</h2>
            <button className='.btn' onClick={()=>{callParentFunction()}}>Play</button>
        </div>
    )
}

export default TitleScreen;
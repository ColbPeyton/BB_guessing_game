import React from 'react';
import Header from './Header';
import logo from '../images/bb_logo.png';

function EndScreen(props){

    function deactivateScreen(){
        props.updateActive('title');
    }

    return(
        <div className='title-screen-container'>
            <div className='title-screen-logo'>
                <Header image={{src: logo, alt: 'Breaking Bad Logo'}}/>
            </div>
            <h2>End</h2>
            <button className='.btn' onClick={()=>{deactivateScreen()}}>Play Again</button>
        </div>
    )
}

export default EndScreen;
import React from 'react';
import logo from '../images/bb_logo.png';

import '../styles/EndScreen.scss';

const endGifs = require('../__data__/endData');

function EndScreen(props){

    function deactivateScreen(){
        props.updateActive('title');
    }

    function chooseGifForDisplay(){
        switch(props.score){
            case 'perfect':
                return <img src={endGifs[0]} alt= {'Perfect'} />
            case 'good':
                return <img src={endGifs[1]} alt= {'Good'} />
            case 'okay':
                return <img src={endGifs[2]} alt= {'Okay'} />
            case 'bad':
                return <img src={endGifs[3]} alt= {'Bad'} />
            default:
                return <img src={endGifs[3]} alt= {'Bad'} />
        }
    }
    function chooseAnswerColor(){
        switch(props.score){
            case 'okay':
                return '#fad201'
            case 'bad':
                return 'red'
            default:
                return '#369457'
        }
    }

    return(
        <div className='end-screen-container'>
            <div className='end-screen-logo'>
                <img src= {logo} alt = 'Breaking Bad Logo'/>
                <h2>Guess the Quote</h2>
            </div>
            <div className='end-screen-content'>
                <div className='end-screen-img'>
                    {chooseGifForDisplay()}
                </div>
                <div className='end-screen-message'>
                    <h3>You Answered</h3>
                    <h2 style={{color: chooseAnswerColor()}}>{props.output.current}</h2>
                    <h3>Correctly</h3>
                </div>
            </div>
            <div className='btn-container'>
                <button className='btn' onClick={()=>{deactivateScreen()}}>Play Again</button>
            </div>
        </div>
    )
}

export default EndScreen;
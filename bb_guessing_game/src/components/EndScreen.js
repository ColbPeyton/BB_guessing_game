import React from 'react';
import ImageContainer from './ImageContainer';
import logo from '../images/bb_logo.png';
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
                return <ImageContainer image={{src: logo, alt: 'Breaking Bad Logo'}} />
        }
    }

    return(
        <div className='title-screen-container'>
            <div className='title-screen-logo'>
                {chooseGifForDisplay()}
            </div>
            <h2>{props.output.current}</h2>
            <button className='.btn' onClick={()=>{deactivateScreen()}}>Play Again</button>
        </div>
    )
}

export default EndScreen;
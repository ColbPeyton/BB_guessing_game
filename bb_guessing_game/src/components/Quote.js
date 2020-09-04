import React from 'react';
import '../styles/Quote.scss';

function Quote(props){

    return(
        <div className='quote'>
            <p>{props.quote}</p>
        </div>
    )
}

export default Quote;
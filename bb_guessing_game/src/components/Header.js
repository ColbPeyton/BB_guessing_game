import React from 'react';
import '../styles/Header.scss';

function Header(props){

    return(
        <div className='header-container'>
                <h3 className='logo'>Breaking Bad Quotes</h3>
                <h3 className='score'>{props.score}</h3>
        </div>

    )
}

export default Header;
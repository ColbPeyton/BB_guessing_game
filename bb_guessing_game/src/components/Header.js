import React from 'react';
import ImageContainer from './ImageContainer';

function Header(props){
    return(
        <div>
            <ImageContainer image={props.image} />
        </div>
    )
}

export default Header;
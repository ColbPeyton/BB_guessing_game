import React from 'react';
import '../styles/ImageContainer.scss';

function ImageContainer(props){
    return(
        <img className='loaded-img' src={props.image.src} alt={props.image.alt} />
    )
}

export default ImageContainer;
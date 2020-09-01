import React from 'react';

function ImageContainer(props){
    return(
        <div>
            <img src={props.image.src} alt={props.image.alt} />
        </div>
    )
}

export default ImageContainer;
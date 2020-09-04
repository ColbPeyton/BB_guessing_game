const invaildCharacters = require('../__data__/invalidCharacters');


export async function getImage (name){
    if(checkIfValidName(name)){
        let updatedName = name.replace(/\s/g, '+');
        const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${updatedName}`)
        const data = await response.json();
        return data;
    }
    return getImageFromAnotherSource(name)
}

// Issue with API responding with broken images from some characters.
function getImageFromAnotherSource(name){
    let url;
    switch(name){
        case 'Jesse Pinkman':
            url = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Jesse_Pinkman_S5B.png/440px-Jesse_Pinkman_S5B.png';
            break;
        default:
            url = 'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Hank_Schrader_S5B.png/440px-Hank_Schrader_S5B.png';
    }
    return Promise.resolve([{name: name, img: url}])
}

function checkIfValidName(name){
    return !invaildCharacters.images.includes(name);
}


export default{
    getImage
}





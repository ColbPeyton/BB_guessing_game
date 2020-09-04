const invalid = require('../__data__/invalidCharacters');

// Not all characters from API have quotes.
// Pulling data from quote endpoint to get relevant characters
export async function getAllCharacterQuotes(){
    const response = await fetch('https://breakingbadapi.com/api/quotes');
    const data = await response.json();
    return data;
}

export async function getAmountOfCharacters(amount){
    const characters = await getAllCharacterQuotes();
    const tempChracters =  generateArrayOfCharacters(characters);

    return generateRandomCharacterArray(amount, tempChracters);
}

function generateArrayOfCharacters(characters){
    const returnedCharacters = [];

    const tempChracters = filterUniqueNames(characters)

    tempChracters.forEach(character => {
        if(invalid.names.includes(character.author)){
          returnedCharacters.push(fixIssueWithAPINames(character.author))  
        }else{
            returnedCharacters.push(character.author) 
        }
    })
    return returnedCharacters;
}

function filterUniqueNames(characters){
    const temp = characters.reduce((unique, o) => {
        if(!unique.some(obj => obj.author === o.author || invalid.characters.includes(o.author))) {
          unique.push(o);
        }
        return unique;
    },[]);
    return temp;
}

// upadate name if it has issue with API img endpoint 
export function fixIssueWithAPINames(name){
    let updatedName;
    switch(name){
        case 'Gus Fring':
            updatedName = 'Gustavo Fring';
            break;
        default:
            updatedName = "Henry Schrader";
            break;
    }
    return updatedName;
}

function generateRandomCharacterArray(amount, characterArr){
    const returnedCharacters = [];
    for(let i = 0; i < amount; i++){
        let random = Math.floor(Math.random() * characterArr.length);
        returnedCharacters.push(characterArr[random]);
    }

    return returnedCharacters;
}


export default {
    getAmountOfCharacters,
    getAllCharacterQuotes,
    fixIssueWithAPINames
}
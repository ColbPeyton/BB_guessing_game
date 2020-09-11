import getAllCharacters from './getAllCharacters';
import getAnswers from './getAnswers';

// OLD, Testing before removal 
// export async function getQuote(name){
//     let updatedName = fixIssueWithAPINames(name);
//     updatedName.replace(/\s/g, '+');
//     try{
//         const response = await fetch(`https://www.breakingbadapi.com/api/quote/random?author=${updatedName}`);
//         const data = await response.json();
//         return data;

//     }
//     catch(err){
//         console.log(err)
//         return undefined;
//     }

// }

// To decrease amount of time loading at beginning, use complete quote list rather than call api.
// removes double quote issue
export async function getQuoteUpdated(names){
    const quotes = [];
    try{
        const data = await getAllCharacters.getAllCharacterQuotes();
        data.splice(52);
        let shuffledData = getAnswers.shuffle(data);
        names.forEach(name => {
            let updatedName = fixIssueWithAPINames(name);
            shuffledData = getQuoteFromArray(shuffledData, updatedName, quotes);
        })
        return quotes;

    }
    catch(err){
        console.log(err)
        return undefined;
    }

}

function getQuoteFromArray(quotes, name, returnedArr){
    for(let i = 0; i < quotes.length; i++){
        if(name === quotes[i].author){
            returnedArr.push({name: name, key: quotes[i].quote});
            quotes.splice(i, 1);
            return quotes;
        }
    }
}





// update name due to API issue with character
function fixIssueWithAPINames(name){
    let updatedName;
    switch(name){
        case 'Gustavo Fring':
            updatedName = 'Gus Fring';
            break;
        case 'Henry Schrader':
            updatedName = "Hank Schrader";
            break;
        default:
            updatedName = name;
    }
    return updatedName;
}


export async function getAmountOfData(namesArr, callback){
    const pArr = [];
    namesArr.forEach (name =>{
        pArr.push(callback(name));
    });

   return await Promise.all(pArr);
}


// Not needed due to api having random quote endpoint
// function chooseRandomQuote(quoteArr){
//     const random = Math.floor(Math.random() * quoteArr.length);
//     return quoteArr[random];
// }



export default {
    // getQuote,
    getAmountOfData,
    getQuoteUpdated
}





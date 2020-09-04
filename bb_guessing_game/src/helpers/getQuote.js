export async function getQuote(name){
    let updatedName = fixIssueWithAPINames(name);
    updatedName.replace(/\s/g, '+');
    try{
        const response = await fetch(`https://www.breakingbadapi.com/api/quote/random?author=${updatedName}`);
        const data = await response.json();
        return data;

    }
    catch(err){
        console.log(err)
        return undefined;
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


export async function getAmountOfData(namesArr, callback, key, name){
    const promArr = [];
    const quoteArr = [];
    await namesArr.forEach (name =>{
         let result = callback(name);
        promArr.push(result)
    });

    promArr.forEach(prom =>{
        prom.then(result => {
            quoteArr.push({key: result[0][key], name:result[0][name]}); 
         });
    })
    return quoteArr;
}

// Not needed due to api having random quote endpoint
// function chooseRandomQuote(quoteArr){
//     const random = Math.floor(Math.random() * quoteArr.length);
//     return quoteArr[random];
// }



export default {
    getQuote,
    getAmountOfData,

}
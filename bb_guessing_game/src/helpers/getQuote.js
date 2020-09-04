export async function getQuote(name){
    const updatedName = name.replace(/\s/g, '+');
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


export async function getAmountOfData(namesArr, callback){
    const promArr = [];
    const quoteArr = [];
    await namesArr.forEach (name =>{
         let result = callback(name);
        promArr.push(result)
    });

    promArr.forEach(prom =>{
        prom.then(result => {
            quoteArr.push(result); 
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
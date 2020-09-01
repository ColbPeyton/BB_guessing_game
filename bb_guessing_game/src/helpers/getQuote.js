module.exports = async function getQuote(amount){
    const response = await fetch(`https://breaking-bad-quotes.herokuapp.com/v1/quotes/${amount}`);
    const data = await response.json();
    return data;
}


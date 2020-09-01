const possibleAnswers = require('../__data__/answerData');



module.exports = function getAnswers(correctName){
    const returnedAnswers = [];
    const takenIndexPositions = [];

    // Find correct answer and store position for random name generation
    const answerLocation = findAnswerLocationInArray(correctName);
    takenIndexPositions.push(answerLocation);

    // push correct answer object 
    returnedAnswers.push({
        name: correctName,
        correct: true
    })

    // generate 3 random answer objects to be returned
    for(let i = 0; i < 3; i++){
        let validRandomNum = chooseRandomName(takenIndexPositions);
        takenIndexPositions.push(validRandomNum)
        let name = possibleAnswers[validRandomNum];
        returnedAnswers.push({
            name,
            correct: false
        })
    }
    return shuffleAnswers(returnedAnswers);
}

//Return random number that has not been choosen previously.
function chooseRandomName(takenIndexPositions){
    let random;
    do{
        random = Math.floor(Math.random() * possibleAnswers.length);
    }
    while(takenIndexPositions.includes(random))

    return random;
}


function findAnswerLocationInArray(correctName){
    return possibleAnswers.findIndex(name => name === correctName)
}


// Fisher-Yates shuffle
// shuffle answers for output
function shuffleAnswers(array) {
    let currentIndex = array.length;
    let temp; 
    let randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
  
    return array;
  }
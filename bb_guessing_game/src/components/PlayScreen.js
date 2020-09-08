import React from 'react';

import Quote from './Quote';
import Answer from './Answer';
import ImageContainer from './ImageContainer';
import Header from './Header';
import Loading from './Loading';
import Timer from './Timer';

import getQuote from '../helpers/getQuote';
import getAnswers from '../helpers/getAnswers';
import getImage from '../helpers/getImage';
import getCharacters from '../helpers/getAllCharacters'; 

import '../styles/PlayScreen.scss'

class PlayScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gameInstance: [],
            userCorrectAnswers : [],
            loadComplete: false,
            currentScore: 0,
            answerTime: 10,
            isBetweenQuestions: false,
            numberOfQuestions: 5,
            currentScoreOutput: null,
            roundNumber: 1
        }
    }

    async componentDidMount(){

        const answerList = await getCharacters.getAmountOfCharacters(this.state.numberOfQuestions);
        const quoteList = this.modifyDataForState(await getQuote.getAmountOfData(answerList, getQuote.getQuote), 'quote', 'author');
        const imageList = this.modifyDataForState(await getQuote.getAmountOfData(answerList, getImage.getImage), 'img', 'name');


        const output = this.filterMultiDataIntoSingleObject(quoteList, imageList)
        
        setTimeout(()=>{
            this.setState(()=>{
                return{
                    gameInstance: output,
                    loadComplete: true,
                    currentScore: 0,
                    currentScoreOutput: `${0}/${this.state.numberOfQuestions}`
                }
            })
        }, 500)
       
    }

    // Data is returned as multiple nested arrays, change into single array of objects
    modifyDataForState = (arr, key, name) =>{
        const returnArr = [];
        arr.forEach((el)=>{
            returnArr.push(
                {
                    name: el[0][name],
                    key: el[0][key]
                }
            )
        })
        return returnArr;
    }

    filterMultiDataIntoSingleObject = (quote, image) =>{
        const filtered = [];
        for(let i = 0; i < quote.length; i++){

            const temp = {
                name: quote[i].name, 
                img: '', 
                quote: quote[i].key
            }; 

            for(let j = 0; j < image.length; j++){
                image[j].name = image[j].name === 'Henry Schrader' ? 'Hank Schrader' : image[j].name;
                image[j].name = image[j].name === 'Gustavo Fring' ? 'Gus Fring' : image[j].name;
                if(quote[i].name === image[j].name){
                    temp.img = image[j].key
                    image.splice(j, 1);
                    break;
                }
            }

            filtered.push(temp);
        }
        return filtered;
    }
    

    // Based on first value in answer list, generate wrong answer list
    generateAnswerList = () =>{
        const {gameInstance} = this.state;
        const currentAnswer = gameInstance[0].name;
        return getAnswers(currentAnswer);

    }

    // TODO fix issue with answer list reloading between rounds. 
    renderAnswerList = () =>{
        const {loadComplete, numberOfQuestions, roundNumber} = this.state;
        const list = this.generateAnswerList();

        return loadComplete && roundNumber <= numberOfQuestions
        ? list.map((answer,index)=> <Answer answer={answer} key={index} returnUserChoice={this.checkIfAnswerIsCorrect}/>)
        : '';
    }

    renderQuote = () =>{
        const{gameInstance, roundNumber, numberOfQuestions} = this.state;
        return gameInstance[0] && roundNumber <= numberOfQuestions
        ? <Quote quote={gameInstance[0].quote}/>
        : '';
    }

    renderImage = () => {
        const{gameInstance, roundNumber, numberOfQuestions} = this.state;
        return gameInstance[0] && roundNumber <= numberOfQuestions
        ? <ImageContainer image={{src: gameInstance[0].img, alt: gameInstance[0].name}}/>
        : ''

    }

    renderScreen = () => {
        const {loadComplete} = this.state;
        if(loadComplete){
            return(
            <div className="play-screen-container">
                <Header score={this.state.currentScoreOutput} />
                <div className='image-container'>
                    {this.inBetweenQuestions()}  
                </div>
                <div className='quote-container'>
                    {this.renderQuote()}
                </div>
                <div className='answer-container'>
                    {this.renderAnswerList()}
                </div>
            </div>
            )
        }else{
            return(
                <div className="play-screen-container">
                    <Header score={this.state.currentScoreOutput} />
                    <Loading />
                </div>
            )
        }
    }


// TODO wait 2 seconds before moving to next question, add css for correct/incorrect answer, render image during time
    inBetweenQuestions(){
        const {isBetweenQuestions, roundNumber, numberOfQuestions} = this.state;

        if(isBetweenQuestions){
            return this.renderImage()
        }else{
            return roundNumber <= numberOfQuestions
            ? <Timer answerTime={this.state.answerTime} didUserAnswerQuestion={this.didUserAnswerQuestion} />
            :''
        }
    }

    waitBetweenQuestions(delay){
        setTimeout(()=> {
            this.setState({isBetweenQuestions: false, roundNumber: this.state.roundNumber + 1})
            this.moveToNextQuestion();
        }, delay)
    }

    

    checkIfAnswerIsCorrect = (answer) =>{
        if(answer){
            this.updateScore(1);
        }else{
            this.updateScore(0);
        }
        this.setState(prevState => ({
            userCorrectAnswers: [...prevState.userCorrectAnswers, answer],
            isBetweenQuestions: true,
          }));
          this.waitBetweenQuestions(3000);
    }

    // Removes first vale from lists, 
    moveToNextQuestion = () =>{
        const {gameInstance} = this.state;

        gameInstance.shift();

        if(gameInstance[0] !== undefined){
            this.setState({
                gameInstance: gameInstance,
            });
        }else{
            setTimeout(() =>{
                this.deactivateScreen()
            }, 1000)
        }
    }

    updateScore = (points) =>{
        let currScore = this.state.currentScore + points
        this.setState({
            currentScoreOutput: `${currScore}/${this.state.numberOfQuestions}`,
            currentScore: currScore
         })
    }

    didUserAnswerQuestion = (response) => {
        if(!response){
            this.checkIfAnswerIsCorrect(false)
        }
    }

    configScoreForEndScreen = () =>{
        const{currentScore, numberOfQuestions} = this.state;

        let score = 'bad';

        if(currentScore === numberOfQuestions){
            score = 'perfect';
        }

        if(currentScore >= (numberOfQuestions / 2)){
            score = 'good'
        }

        return score
        
    }

    deactivateScreen(){
        this.props.updateActive('play', this.configScoreForEndScreen(), this.state.currentScoreOutput);
    }


    render(){
        return(
            <div>
                {this.renderScreen()}
            </div>
        )
    }

}

export default PlayScreen;
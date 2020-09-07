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
            answerTime: 5,
            waitBetweenQuestions: false
        }
    }

    async componentDidMount(){
        let numberOfQuestions = 5;

        const answerList = await getCharacters.getAmountOfCharacters(numberOfQuestions);
        const quoteList = this.modifyDataForState(await getQuote.getAmountOfData(answerList, getQuote.getQuote), 'quote', 'author');
        const imageList = this.modifyDataForState(await getQuote.getAmountOfData(answerList, getImage.getImage), 'img', 'name');


        const output = this.filterMultiDataIntoSingleObject(quoteList, imageList)
        
        setTimeout(()=>{
            this.setState(()=>{
                return{
                    gameInstance: output,
                    loadComplete: true,
                    currentScore: 0,
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

    renderAnswerList = () =>{
        const {loadComplete} = this.state;
        const list = this.generateAnswerList();

        return loadComplete
        ? list.map((answer,index)=> <Answer answer={answer} key={index} returnUserChoice={this.checkIfAnswerIsCorrect}/>)
        : '';
    }

    renderQuote = () =>{
        const {gameInstance} = this.state;
        return gameInstance[0]
        ? <Quote quote={gameInstance[0].quote}/>
        : '';
    }

    renderImage = () => {
        const{gameInstance} = this.state;
        return gameInstance[0]
        ? <ImageContainer image={{src: gameInstance[0].img, alt: gameInstance[0].name}}/>
        : ''

    }

    renderScreen = () => {
        const {loadComplete} = this.state;
        if(loadComplete){
            return(
            <div className="play-screen-container">
                <Header score={this.state.currentScore} />
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
                    <Header score={this.state.currentScore} />
                    <Loading />
                </div>
            )
        }
    }
// TODO wait 2 seconds before moving to next question, add css for correct/incorrect answer, render image during time
    inBetweenQuestions(){
        const {waitBetweenQuestions} = this.state;

        if(waitBetweenQuestions){
            return this.renderImage()
        }else{
            return <Timer answerTime={this.state.answerTime} didUserAnswerQuestion={this.didUserAnswerQuestion} />
        }
    }

    checkIfAnswerIsCorrect = (answer) =>{
        if(answer){
            this.updateScore(10);
        }else{
            this.updateScore(0);
        }
        this.setState(prevState => ({
            userCorrectAnswers: [...prevState.userCorrectAnswers, answer],
            waitBetweenQuestions: true
          }));
          this.inBetweenQuestions();
    }

    // Removes first vale from lists, 
    moveToNextQuestion = () =>{
        const {gameInstance} = this.state;

        gameInstance.shift();

        if(gameInstance[0] !== undefined){
            this.setState({
                gameInstance: gameInstance,
            });
            console.log(this.state)
        }else{
            this.deactivateScreen()
        }
    }

    updateScore = (points) =>{
        let currScore = this.state.currentScore + points
        this.setState({
            currentScore: currScore
         })
    }

    didUserAnswerQuestion = (response) => {
        if(!response){
            this.checkIfAnswerIsCorrect(false)
        }
    }

    deactivateScreen(){
        this.props.updateActive('play');
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
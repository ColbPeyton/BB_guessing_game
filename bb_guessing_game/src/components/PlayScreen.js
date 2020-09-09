import React from 'react';

import Quote from './Quote';
import Answer from './Answer';
import ImageContainer from './ImageContainer';
import Header from './Header';
import Loading from './Loading';
import Timer from './Timer';
import AnswerStatus from './AnswerStatus';

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
            answerTime: props.gameSettings[1].current,
            isBetweenQuestions: false,
            numberOfQuestions: props.gameSettings[0].current,
            currentScoreOutput: null,
            roundNumber: 1,
        }
    }

    async componentDidMount(){

        const answerList = await getCharacters.getAmountOfCharacters(this.state.numberOfQuestions);
        const quoteList = this.modifyDataForState(await getQuote.getAmountOfData(answerList, getQuote.getQuote), 'quote', 'author');
        const imageList = this.modifyDataForState(await getQuote.getAmountOfData(answerList, getImage.getImage), 'img', 'name');


        const output = this.filterMultiDataIntoSingleObject(quoteList, imageList)

        const answers = [];
        output.forEach(el => {
            answers.push(this.generateAnswerList(el.name));
        })

        output.allAnswers = answers;
        
        setTimeout(()=>{
            this.setState(()=>{
                return{
                    gameInstance: output,
                    loadComplete: true,
                    currentScore: 0,
                    currentScoreOutput: `${0}/${this.state.numberOfQuestions}`,
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
    

    // Based on name, generate wrong answer list
    generateAnswerList = (name) =>{
        const currentAnswer = name;
        return getAnswers(currentAnswer);
    }

    renderAnswerList = () =>{
        const {loadComplete, numberOfQuestions, roundNumber, gameInstance, isBetweenQuestions} = this.state;
        const list = gameInstance.allAnswers[0];
        return loadComplete && roundNumber <= numberOfQuestions
        ? list.map((answer,index)=> <Answer answer={answer} key={index} returnUserChoice={this.checkIfAnswerIsCorrect} disabled={isBetweenQuestions}/>)
        : '';
    }

    renderQuote = () =>{
        const{gameInstance, roundNumber, numberOfQuestions} = this.state;
        return gameInstance[0] && roundNumber <= numberOfQuestions
        ? <Quote quote={gameInstance[0].quote}/>
        : '';
    }

    renderAnswerStatus = () => {
        const{userCorrectAnswers, roundNumber} = this.state; 
        return <AnswerStatus status={userCorrectAnswers[roundNumber - 1]} />
    }

    renderImage = () => {
        const{gameInstance, roundNumber, numberOfQuestions} = this.state;
        return gameInstance[0] && roundNumber <= numberOfQuestions
        ?   <div>
                <ImageContainer image={{src: gameInstance[0].img, alt: gameInstance[0].name}}/>
                {this.renderAnswerStatus()}
            </div>
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


// TODO send Answer time to modify speed of timer animation
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

    // Removes first value from arrays, 
    moveToNextQuestion = () =>{
        const {gameInstance} = this.state;

        gameInstance.shift();
        gameInstance.allAnswers.shift();

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

        let score = 'okay';

        if(currentScore >= (numberOfQuestions / 2)){
            score = 'good'
        }
        if(currentScore === numberOfQuestions){
            score = 'perfect';
        } 
        if(currentScore === 0){
            score = 'bad'
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
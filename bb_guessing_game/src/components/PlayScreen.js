import React from 'react';
import Quote from './Quote';
import Answer from './Answer';
import ImageContainer from './ImageContainer';
import Header from './Header';

import getQuote from '../helpers/getQuote';
import getAnswers from '../helpers/getAnswers';
import getImage from '../helpers/getImage';
import getCharacters from '../helpers/getAllCharacters'; 

import '../styles/PlayScreen.scss'

class PlayScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quoteList: [],
            answerList: [],
            imageList: [],
            userCorrectAnswers : [],
            loadComplete: false,
            currentScore: 0
        }
    }

    async componentDidMount(){
        let numberOfQuestions = 5;

        const answerList = await getCharacters.getAmountOfCharacters(numberOfQuestions);
         


        // characterList.forEach(character =>{
        //     answerList.push(character);
        // })


        const data = await this.sequence(
            getQuote.getAmountOfData(answerList, getQuote.getQuote, 'quote', 'author'), 
            getQuote.getAmountOfData(answerList, getImage.getImage, 'img', 'name')
            );

            // TODO Fix issue with data setup, filter relevant quote/author/image into array of length 3
            // can have multiple quotes by same character
        const quoteList = await data[0];
        const imageList = await data[1];

        const filtered = []
        answerList.forEach(answer => {
            filtered.push(
                
            )
        })

        console.log(quoteList, imageList, answerList)


        // setTimeout(()=>{
        //     this.setState(()=>{
        //         return{
        //             quoteList : quoteList,
        //             answerList : answerList,
        //             imageList: imageList,
        //             loadComplete: true,
        //             currentScore: 0
        //         }
        //     })
        // }, 500)
       
    }

    async sequence(pOne, pTwo) {
        return await Promise.all([pOne, pTwo]);  
    }


    // Based on first value in answer list, generate wrong answer list
    generateAnswerList = () =>{
        const {answerList} = this.state;
        const currentAnswer = answerList[0];
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
        const {quoteList} = this.state;
        return quoteList[0]
        ? <Quote quote={quoteList[0]}/>
        : '';
    }

    renderImage = () => {
        const{imageList, answerList} = this.state;
        return imageList[0]
        ? <ImageContainer image={{src: imageList[0], alt: answerList[0]}}/>
        : ''

    }

    renderScreen = () => {
        const {loadComplete} = this.state;
        if(loadComplete){
            return(
            <div className="play-screen-container">
                <Header score={this.state.currentScore} />
                <div className='image-container'>
                    {this.renderImage()}
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
            return 'Loading...'
        }
    }

    checkIfAnswerIsCorrect = (answer) =>{
        if(answer){
            this.updateScore(10);
        }else{
            this.updateScore(0);
        }
        this.setState(prevState => ({
            userCorrectAnswers: [...prevState.userCorrectAnswers, answer]
          }));
          this.moveToNextQuestion()
    }

    // Removes first vale from lists, 
    moveToNextQuestion = () =>{
        const {quoteList, answerList, imageList} = this.state;

        quoteList.shift();
        answerList.shift();
        imageList.shift();

        if(quoteList[0] !== undefined){
            this.setState({
                quoteList: quoteList,
                answerList: answerList,
                imageList: imageList
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
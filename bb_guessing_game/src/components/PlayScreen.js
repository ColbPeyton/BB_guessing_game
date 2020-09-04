import React from 'react';
import Quote from './Quote';
import Answer from './Answer';

import getQuote from '../helpers/getQuote';
import getAnswers from '../helpers/getAnswers';
import getImage from '../helpers/getImage';
import getCharacters from '../helpers/getAllCharacters'; 
import filterByKey from '../helpers/arrayHelper';


class PlayScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quoteList: [],
            answerList: [],
            characterImages: [],
            userCorrectAnswers : [],
            loadComplete: false
        }
    }

    async componentDidMount(){
        let numberOfQuestions = 5;

        const characterList = await getCharacters.getAmountOfCharacters(numberOfQuestions);
         
        const answerList = [];
       
        characterList.forEach(character =>{
            answerList.push(character);
        })

        const tempQuoteList = await getQuote.getAmountOfData(answerList, getQuote.getQuote);
        const tempImageList = await getQuote.getAmountOfData(answerList, getImage.getImage);


        const quoteList = tempQuoteList.map(function(item) { return item["quote"]; });
        const imageList = filterByKey(tempImageList, 'img');


        console.log(answerList)
        console.log(imageList)
        console.log(quoteList)

    
        this.setState(()=>{
            return{
                quoteList : quoteList,
                answerList : answerList,
                characterImages: imageList,
                loadComplete: true
            }
        })
    }


    generateAnswerList = () =>{
        const {answerList} = this.state;
        const currentAnswer = answerList[0];
        return getAnswers(currentAnswer);

    }

    renderAnswerList = () =>{
        const {loadComplete} = this.state;
        const list = this.generateAnswerList();

        return loadComplete
        ? list.map((answer,index)=> <Answer answer={answer} key={index} returnUserChoice={this.checkIfCorrect}/>)
        : '';
    }

    renderQuote = () =>{
        const {quoteList} = this.state;
        return quoteList
        ? <Quote quote={quoteList[0]}/>
        : '';
    }

    checkIfCorrect = (answer) =>{
        this.setState(prevState => ({
            userCorrectAnswers: [...prevState.userCorrectAnswers, answer]
          }));
          this.moveToNextQuestion()
    }

    // Removes first vale from lists, 
    moveToNextQuestion = () =>{
        const tempQuotes = [...this.state.quoteList];
        const tempAnswers = [...this.state.answerList];

        tempQuotes.splice(0, 1);
        tempAnswers.splice(0, 1);

        if(tempQuotes[0] !== undefined){
            this.setState({
                quoteList: tempQuotes,
                answerList: tempAnswers
            });
        }else{
            this.deactivateScreen()
        }
    }

    deactivateScreen(){
        this.props.updateActive('play');
    }


    render(){
        return(
            <div>
               <div>
                    {this.renderQuote()}
                    {this.renderAnswerList()}
               </div>
            </div>
        )
    }

}

export default PlayScreen;
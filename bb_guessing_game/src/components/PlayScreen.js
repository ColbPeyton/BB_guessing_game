import React from 'react';
import Quote from './Quote';
import Answer from './Answer';

import getQuote from '../helpers/getQuote';
import getAnswers from '../helpers/getAnswers';


class PlayScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quoteList: ['t1w', 't2h', 't3s', 't4w', 't5w'],
            answerList: ["Walter White", "Hank Schrader", "Saul Goodman", "Walter White", "Walter White"],
            userCorrectAnswers : []
        }
    }

    // async componentDidMount(){
    //     let tempQuoteList;
    //     let tempAnswerList;

    //     // Convert promise data to value and store in temp array
    //     await getQuote(5)
    //     .then(data =>{
    //         tempQuoteList = this.generateList(data, 'quote');
    //         tempAnswerList = this.generateList(data, 'author');
            
    //     })

    //     this.setState(()=>{
    //         return{
    //             quoteList : tempQuoteList,
    //             answerList : tempAnswerList
    //         }
    //     })

    //     console.log(this.state);
    // }

    // Returns data and stores correct values in array
    generateList(list, value){
        const tempList = [];
        list.forEach(quote =>{
            tempList.push(quote[value]);
        })
        return tempList; 
    }

    generateAnswerList = () =>{
        const {answerList} = this.state;
        const currentAnswer = answerList[0];
        return getAnswers(currentAnswer);

    }

    renderAnswerList = () =>{
        const {answerList} = this.state;
        const list = this.generateAnswerList();

        return answerList
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
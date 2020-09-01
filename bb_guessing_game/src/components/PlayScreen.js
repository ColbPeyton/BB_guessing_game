import React from 'react';
import Quote from './Quote';

import getQuote from '../helpers/getQuote';
import getAnswers from '../helpers/getAnswers';


class PlayScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quoteList: [],
            answerList: []
        }
    }

    async componentDidMount(){
        let tempQuoteList;
        let tempAnswerList;

        // Convert promise data to value and store in temp array
        await getQuote(5)
        .then(data =>{
            tempQuoteList = this.generateList(data, 'quote');
            tempAnswerList = this.generateList(data, 'author');
            
        })

        this.setState(()=>{
            return{
                quoteList : tempQuoteList,
                answerList : tempAnswerList
            }
        })

        console.log(this.state);
    }

    // Returns data and stores correct values in array
    generateList(list, value){
        const tempList = [];
        list.forEach(quote =>{
            tempList.push(quote[value]);
        })
        return tempList; 
    }

    render(){
        return(
            <div>
               <div>
                   {/* <Quote quote={}/> */}
               </div>
            </div>
        )
    }

}

export default PlayScreen;
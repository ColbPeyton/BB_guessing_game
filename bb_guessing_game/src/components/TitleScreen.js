import React,{useState}from 'react';
import logo from '../images/bb_logo.png';
import '../styles/TitleScreen.scss';


function TitleScreen(props){

    const [quote, setQuotes] = useState(5);
    const [difficulty, setDifficulty] = useState('20');

    function deactivateScreen(){
        props.updateActive('title');
    }

    function difficultyChange(event){
        setDifficulty(event.target.value);
    }

    function quoteChange(event){
        setQuotes(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        props.getDifficultyAndQuote([quote, difficulty]);
        deactivateScreen();
    }

    return(
        <div className='title-screen-container'>
            <div className='title-screen-logo'>
                <img src= {logo} alt='Breaking Bad Logo'/>
                <h2>Guess the Quote</h2>
            </div>

            <form className='title-screen-form' onSubmit={handleSubmit}>
            <div className='form-container'>
                <div className='form-content'>
                    <label htmlFor="difficulty">Difficulty:</label>
                        <select value={difficulty} onChange={difficultyChange}>
                            <option value="20">Easy</option>
                            <option value="10">Medium</option>
                            <option value="5">Hard</option>
                        </select>
                </div>
                <div className='form-content'>
                    <label htmlFor="quotes">Quotes:</label>
                        <select value={quote} onChange={quoteChange}>
                            <option value="5">5 Quotes</option>
                            <option value="10">10 Quotes</option>
                            <option value="15">15 Quotes</option>
                        </select>
                </div>
            </div>
                <div className='btn-container'>
                    <button className='btn'>Play</button>
                </div>
            </form>
        </div>
    )
}

export default TitleScreen;
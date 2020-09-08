import React,{useState, useRef} from 'react';
import TitleScreen from './components/TitleScreen';
import PlayScreen from './components/PlayScreen';
import EndScreen from './components/EndScreen';
import './styles/App.scss';

function App() {
  const [titleActive, setTitleActive] = useState(false);
  const [playActive, setPlayActive] = useState(true);
  const [endActive, setEndActive] = useState(false);
  let score = useRef(0)
  let output = useRef('');

  const disableScreen = (screen, userScore = 0, scoreDisplay) => {
    score.current = userScore;
    output.current = scoreDisplay;
    switch(screen){
      case 'title':
        setTitleActive(false)
        break;
      case 'play':
        setPlayActive(false)
        break;
      default:
        setEndActive(false)
    }
  }
  
  // Disable end screen, reenable title/play. Title screen will be active screen 
  const playAgain = (screen) =>{
    disableScreen(screen);
    setTitleActive(true);
    setPlayActive(true);
  }

  const renderActiveScreen = () =>{
    let activeScreen;

    if(titleActive){
      activeScreen = <TitleScreen updateActive={disableScreen}/>
    }else if(playActive){
      activeScreen = <PlayScreen updateActive={disableScreen}/>
    }else{
      activeScreen = <EndScreen updateActive={playAgain} score={score.current} output={output}/>
    }
    return activeScreen;
  }

  return (
    <div className="App">
      {renderActiveScreen()}
    </div>
  );
}

export default App;

import React,{useState} from 'react';
import TitleScreen from './components/TitleScreen';
import PlayScreen from './components/PlayScreen';
import EndScreen from './components/EndScreen';
import './styles/App.scss';

function App() {
  const [titleActive, setTitleActive] = useState(false);
  const [playActive, setPlayActive] = useState(true);
  const [endActive, setEndActive] = useState(false);

  const disableScreen = (screen) => {
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
      activeScreen = <EndScreen updateActive={playAgain}/>
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

import React,{useState} from 'react';
import TitleScreen from './components/TitleScreen';
import PlayScreen from './components/PlayScreen';
import './styles/App.scss';

function App() {
  const [titleActive, setTitleActive] = useState(false);

  const disableTitle = () => {
    setTitleActive(false)
  }

  const renderActiveScreen = () =>{
    return titleActive 
    ? <TitleScreen updateActive={disableTitle}/>
    : <PlayScreen />
  }

  return (
    <div className="App">
      {renderActiveScreen()}
    </div>
  );
}

export default App;

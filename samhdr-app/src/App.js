import './App.css';
import React from 'react';
import Navbar from './components/Navbar.js'
import MainContent from './components/MainContent.js'
import HowToPlayContent from './components/HowToPlayContent';
import StartGameContent from './components/StartGameContent';
import PickSuitsContent from './components/PickSuitsContent';

function App() {
  
  const [testLO, setLayout] = React.useState(<h1 className='main--content'>Welcome to SAMHDR</h1>, function setContent(jpx){
    return (jpx)
  })
  const setHowToPlay = function howToPlay(){
    setLayout(<HowToPlayContent/>)
  }
  const setStartGame = function startGame(){
    setLayout(<PickSuitsContent/>)
  }
  const setQuitGame = function quitGame(){
    setLayout(<StartGameContent/>)
  }
  

  return (
    <div className="App">
      <Navbar howToPlay={setHowToPlay} startGame={setStartGame} quitGame={setQuitGame}/>
      <MainContent content={testLO}/>
    </div>
  );
}

export default App


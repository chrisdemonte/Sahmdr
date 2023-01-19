import './App.css';
import React from 'react';
import Navbar from './components/Navbar.js'
import MainContent from './components/MainContent.js'
import StartGameContent from './components/StartGameContent';


function App(props) {

  const socket = props.socket
 // const otherPlayers = props.otherPlayers
  const [testLO, setLayout] = React.useState(<StartGameContent socket={socket}/>)

  return (
    <div className="App">
      <Navbar setLayout={setLayout} socket={socket}/>
      <MainContent content={testLO}/>
    </div>
  );
}

export default App


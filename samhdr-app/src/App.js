import './App.css';
import React from 'react';
import Navbar from './components/Navbar.js'
import MainContent from './components/MainContent.js'


function App() {
  
  const [testLO, setLayout] = React.useState(<h1 className='main--content'>Welcome to SAMHDR</h1>)


  return (
    <div className="App">
      <Navbar setLayout={setLayout}/>
      <MainContent content={testLO}/>
    </div>
  );
}

export default App


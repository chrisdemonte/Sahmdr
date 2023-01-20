import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import io from 'socket.io-client'

var socket 

try {
  //socket = io('http://localhost:2020')
  socket = io('http://3.84.112.144:2020')
}
catch (error){
  
}

/*
window.addEventListener("beforeunload", (ev) => 
{  
    //socket.emit("player-disconnect")
    socket.disconnect()
});*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
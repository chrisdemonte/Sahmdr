import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import io from 'socket.io-client'

var socket = io('http://localhost:22222')

var gameData = {
  "name" : "",
  "health" : 50,
  "counters" : [0,0,0,0,0,0],
  "deck" : [],
  "hand" : [],
  "nextCard" : 0,
  shuffleDeck : function sd (){
    for (let i = this.deck.length - 1; i > 0; i++){
      let index = Math.floor(Math.random() * i)
      let swap = this.deck[index]
      this.deck[index] = this.deck[i]
      this.deck[i] = swap
    }
  },
  getNextCard : function gnc() {
    if (this.nextCard >= this.deck.length){
      return null
    }
    let card = this.deck[this.nextCard]
    this.nextCard++
    return card
  },
  reset : function r (){
    this.health = 50
    this.counters = [0,0,0,0,0,0]
    this.deck = []
    this.hand = []
    this.nextCard = 0
  }

}
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

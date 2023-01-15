import "../App.css"
import React from "react"
import Card from "./Card.js"

function CardGame(props){
   
    const setLayout = props.setLayout
    const socket = props.socket
    const name = props.name
    const pSocket = props.pSocket
    const pName = props.pName
    const moveFirst = props.moveFirst
    const selections = props.selections

    const deck = props.deck
    const hand = props.hand
    var nextCard = 0
    var selectedCard = -1


    function drawCard(slot){
        if (nextCard >= deck.length){
            return null
        }
        hand[slot] = deck[nextCard]
        nextCard++
    }

    React.useEffect(() =>{

        console.log(deck)
        console.log(hand)
    }, [])

    return (
        <div className="game">
            <h1>Game!</h1>
            <div className="game--opponent-stats"></div>
            <div className="game--opponent-hand">
                <Card suit={0} value={1}/>
                <Card suit={0} value={1}/>
                <Card suit={0} value={1}/>
                <Card suit={0} value={1}/>
                <Card suit={0} value={1}/>
            </div>
            <div className="game--opponent-active-card"></div>
            <div className="game--player-active-card"></div>
            <div className="game--player-hand">
                <Card suit={hand[0].suit} value={hand[0].value}/>
                <Card suit={hand[1].suit} value={hand[1].value}/>
                <Card suit={hand[2].suit} value={hand[2].value}/>
                <Card suit={hand[3].suit} value={hand[3].value}/>
                <Card suit={hand[4].suit} value={hand[4].value}/>
            </div>
            <div className="game--player-moves"></div>
            <div className="game--player-stats"></div>
        </div>
    )
}
export default CardGame
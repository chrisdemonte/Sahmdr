import "../App.css"
import React from "react"
import Card from "./Card.js"
import GameStatsBar from "./GameStatsBar.js"
import GameControlsBar from "./GameControlsBar.js"

function CardGame(props){
   
    const setLayout = props.setLayout
    const socket = props.socket
    const name = props.name
    const pSocket = props.pSocket
    const pName = props.pName
    const moveFirst = props.moveFirst
    const selections = props.selections

    const playerCardSelection= React.useState([0,0,0,0,0])
    const opponentCardSelection = React.useState([0,0,0,0,0])

    const deck = props.deck
    const hand = props.hand
    const [opponentHand, setOpponentHand] = React.useState([0,0,0,0,0])
    var nextCard = 0
    //var selectedCard = -1
    const [playerCard, setPlayerCard] = React.useState({"suit": -1, "value" : 0})
    const [opponentCard, setOpponentCard] = React.useState({"suit": -1, "value" : 0})

    const controlsDisabled = React.useState(["","","",""])

    function drawCard(slot){
        if (nextCard >= deck.length){
            return null
        }
        hand[slot] = deck[nextCard]
        nextCard++
    }
    socket.off("opponent-select-card")
    socket.on("opponent-select-card", (slot)=>{
        console.log("opponent-select-card")
        let [ocs, setOCS] = opponentCardSelection
        let selection = [0,0,0,0,0]
        selection[slot] = 1
        setOCS(selection)
    })
    socket.off("opponent-used-play-card")
    socket.on("opponent-used-play-card", (index, selectedCard)=>{
        
        console.log(index)
        let newHand = [0,0,0,0,0]
        newHand[index] = -1

       // selection[index] = 1
        setOpponentCard(selectedCard)
        setOpponentHand(newHand)
    })

    React.useEffect(() =>{

        console.log(deck)
        console.log(hand)
    }, [])

    return (
        <div className="game">
            <div className="game--opponent-stats">
                <GameStatsBar />
            </div>
            <div className="game--opponent-hand">
                <Card suit={opponentHand[0]} value={0} slot ={0} selectionState = {opponentCardSelection}/>
                <Card suit={opponentHand[1]} value={0} slot ={1} selectionState = {opponentCardSelection}/>
                <Card suit={opponentHand[2]} value={0} slot ={2} selectionState = {opponentCardSelection}/>
                <Card suit={opponentHand[3]} value={0} slot ={3} selectionState = {opponentCardSelection}/>
                <Card suit={opponentHand[4]} value={0} slot ={4} selectionState = {opponentCardSelection}/>
            </div>
            <div className="game--opponent-active-card"></div>
                <Card suit={opponentCard.suit} value={opponentCard.value} slot={5} selectionState = {opponentCardSelection}/>
            <div className="game--player-active-card"></div>
                <Card suit={playerCard.suit} value={playerCard.value} slot={5} selectionState = {playerCardSelection}/>
            <div className="game--player-hand">
                <Card suit={hand[0].suit} value={hand[0].value} slot ={0} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket}/>
                <Card suit={hand[1].suit} value={hand[1].value} slot ={1} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket}/>
                <Card suit={hand[2].suit} value={hand[2].value} slot ={2} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket}/>
                <Card suit={hand[3].suit} value={hand[3].value} slot ={3} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket}/>
                <Card suit={hand[4].suit} value={hand[4].value} slot ={4} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket}/>
            </div>
            <div className="game--player-moves"></div>
                <GameControlsBar selectionState= {playerCardSelection} hand = {hand} activeCard = {playerCard} activeCardSetter = {setPlayerCard} socket={socket} opponentSocket={pSocket} disabled={controlsDisabled}/>
            <div className="game--player-stats">
                <GameStatsBar />
            </div>
        </div>
    )
}
export default CardGame
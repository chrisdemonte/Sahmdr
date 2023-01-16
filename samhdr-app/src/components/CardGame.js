import "../App.css"
import React from "react"
import Card from "./Card.js"
import GameStatsBar from "./GameStatsBar.js"
import GameControlsBar from "./GameControlsBar.js"

function CardGame(props){
   
    /**
     * Card Game Data and states
     */
    const setLayout = props.setLayout   //function for changing the page's content
    const socket = props.socket   //the player's socket
    const name = props.name     //the player's name
    const pSocket = props.pSocket //id of the opponent's socket
    const pName = props.pName   //opponent's name
    const moveFirst = props.moveFirst // either 0 or 1, picked randomly by the server. if 1, you move first on phase 1, if 0 you move first on phase 0 
    const selections = props.selections //an array with length 6 that has the suits selected from the pick suits page. 0 = not selected, 1 = selected

    const playerCardSelection= React.useState([0,0,0,0,0]) //which card from the hand was clicked last. 0 = not clicked, 1 = clicked
    const opponentCardSelection = React.useState([0,0,0,0,0]) //which card from the opponent's hand was clicked last. 0 = not clicked, 1 = clicked
    const [playerCard, setPlayerCard] = React.useState({"suit": -1, "value" : 0}) //the player's active card from playing a move
    const [opponentCard, setOpponentCard] = React.useState({"suit": -1, "value" : 0}) //the opponent's active card from playing a move


    const deck = props.deck         //an array of length 39 with card objects
    const hand = props.hand         //an array of length 5 with card object
    const [opponentHand, setOpponentHand] = React.useState([0,0,0,0,0]) //an array of integers with length 5 used to set the display of the opponent's hand. 0 = back of card, -1 = empty slot
    const [nextCard, setNexCard] = React.useState(5)                //a pointer to the next card in your deck
    const [opponentNextCard, setOpponentNextCard] = React.useState(5)
    const [phase, setPhase] = React.useState(1)                   //the current phase of the match, 1 means the player with moveFirst==1 is offense and other player is defense. goes between 1 and 0
    const stats = React.useState([50,0,0,0,0,0,0])
    const opponentStats = React.useState([50,0,0,0,0,0,0])
  
    const controlsDisabled = React.useState(["","","",""])

    function drawCard(){
        if (nextCard >= deck.length){
            return 
        }
        let slot = -1
        for (let i = 0; i < 5; i++){
            if (hand[i].suit === -1){
                slot = i
            }
        }
        hand[slot] = deck[nextCard]
        setNexCard((prev) => (prev + 1))
    }
    function openToCounter(){
        controlsDisabled[1](["","-disabled","-disabled","-disabled"])
    }
    function endPhase(){
        setPhase((prev) => {
            let newPhase = (prev + 1) % 2
            if (newPhase === moveFirst){
                controlsDisabled[1](["","","",""])
            }
            return newPhase
        
        })

    }
    socket.off("opponent-select-card")
    socket.on("opponent-select-card", (slot)=>{
        console.log("opponent-select-card")
        let selection = [0,0,0,0,0]
        selection[slot] = 1
        opponentCardSelection[1](selection)
    })
    socket.off("opponent-used-play-card")
    socket.on("opponent-used-play-card", (index, selectedCard)=>{
        
        console.log(index)
        let newHand = [0,0,0,0,0]
        newHand[index] = -1

       // selection[index] = 1
        setOpponentCard(selectedCard)
        setOpponentHand(newHand)

        if (phase === moveFirst){
            socket.emit("end-phase-play-card", playerCard, selectedCard, pSocket)
        } 
        else {
            openToCounter()
        }
    })
    socket.off("end-phase-play-card")
    socket.on("end-phase-play-card", (offensivePlayer, damage_heal)=>{
        //console.log("end-phase-play-card: " + target + damage_heal)
        let statAry = [... stats[0]]
        let opponentStatAry = [... opponentStats[0]]
        if (offensivePlayer === 0){
            statAry[0] -= damage_heal[0]
            statAry[0] += damage_heal[1]
        }
        else {
            opponentStatAry[0] -= damage_heal[0]
            opponentStatAry[0] += damage_heal[1]
        }
        stats[1](statAry)
        opponentStats[1](opponentStatAry)

        setPlayerCard({"suit": -1, "value" : 0})
        setOpponentCard({"suit": -1, "value" : 0})
        if (opponentNextCard < 39){
            setOpponentHand([0,0,0,0,0])
            setOpponentNextCard((prev) => {return prev + 1})
        }
        drawCard()
        playerCardSelection[1]([0,0,0,0,0])
        opponentCardSelection[1]([0,0,0,0,0])

        endPhase()
        
    })

    React.useEffect(() =>{

        console.log(deck)
        console.log(hand)
        console.log("movefirst:" + moveFirst)
        console.log("phase:" + phase)
        if (moveFirst != phase){
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
    }, [])

    return (
        <div className="game">
            <div className="game--opponent-stats">
                <GameStatsBar stats={opponentStats}/>
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
                <GameStatsBar stats={stats}/>
            </div>
        </div>
    )
}
export default CardGame
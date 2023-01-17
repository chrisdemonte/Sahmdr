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
    const playerMove = React.useState(-1)
  
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
    function doCounterDamage(){
        let pStats = [... stats[0]]
        let oStats = [... opponentStats[0]]
        for (let i = 1; i < 4; i++){
            if (pStats[i] > 0){
                pStats[i]--
                pStats[0]--
            }
            if (oStats[i] > 0){
                oStats[i]--
                oStats[0]--
            }
        }
        for (let j = 4; j < 7; j++){
            if (pStats[j] > 0){
                pStats[j]--
                pStats[0]++
            }
            if (oStats[j] > 0){
                oStats[j]--
                oStats[0]++
            }
        }
        stats[1](pStats)
        opponentStats[1](oStats)

    }
    function changeStats(statState, damage, healing, newCounter){

        let statAry = [... statState[0]]
        if (newCounter != null){
            for (let i = 1; i < 7; i++ ){
                statAry[i] += newCounter[i]
            }
        }
        statAry[0] += healing - damage

        for (let k = 1; k < 4; k++){
            if (statAry[k] > 0){
                statAry[k]--
                statAry[0]--
            }
        }
        for (let j = 4; j < 7; j++){
            if (statAry[j] > 0){
                statAry[j]--
                statAry[0]++
            }
        }

        statState[1](statAry)

    }
    function endPhase(){
        
        setPlayerCard({"suit": -1, "value" : 0})
        setOpponentCard({"suit": -1, "value" : 0})
        if (opponentNextCard < 39){
            setOpponentHand([0,0,0,0,0])
            setOpponentNextCard((prev) => {return prev + 1})
        }
        drawCard()
        playerCardSelection[1]([0,0,0,0,0])
        opponentCardSelection[1]([0,0,0,0,0])

        setPhase((prev) => {
            let newPhase = (prev + 1) % 2
            if (newPhase === moveFirst){
                controlsDisabled[1](["","","",""])
            }
            return newPhase
        
        })
        playerMove[1](-1)

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
            if (playerMove[0] === 0){
                socket.emit("end-phase-play-card", playerCard, selectedCard, pSocket)
            }
            if (playerMove[0] === 1){
                socket.emit("end-phase-play-face-down", playerCard, selectedCard, pSocket)
            }
            if (playerMove[0] === 22){
                socket.emit("end-phase-stack", playerCard, selectedCard, pSocket)
            }
        } 
        else {
            openToCounter()
        }
    })
    socket.off("opponent-used-play-face-down")
    socket.on("opponent-used-play-face-down", (index, selectedCard)=>{
        
       // console.log(index)
        let newHand = [0,0,0,0,0]
        newHand[index] = -1

       // selection[index] = 1
        setOpponentCard(selectedCard)
        setOpponentHand(newHand)

        openToCounter()
        
    })
    socket.off("opponent-used-stack-0")
    socket.on("opponent-used-stack-0", (index)=>{
        let newHand = [0,0,0,0,0]
        newHand[index] = -1

       // selection[index] = 1
        setOpponentCard({"suit": 0, "value":0})
        setOpponentHand(newHand)
    })
    socket.off("opponent-used-stack-1")
    socket.on("opponent-used-stack-1", ()=>{
        setOpponentCard({"suit": -1, "value":0})
        openToCounter()
        
    })
    socket.off("reveal-card")
    socket.on("reveal-card", (whichCard)=>{
        console.log("reaveal:" + whichCard)
        if (whichCard === 1){
            setPlayerCard(playerCard.card)
        }
        else {
            setOpponentCard(opponentCard.card)
        }
    })
    socket.off("end-phase-play-card")
    socket.on("end-phase-play-card", (oneWhoTriggered, damage_heal)=>{
        //console.log("end-phase-play-card: " + target + damage_heal)
        /*
        let statAry = [... stats[0]]
        let opponentStatAry = [... opponentStats[0]]
        if (oneWhoTriggered === 1){
            statAry[0] += damage_heal[1]
            opponentStatAry[0] -=  damage_heal[0]
        }
        else {
            opponentStatAry[0] += damage_heal[1]
            statAry[0] -= damage_heal[0]
        }
        stats[1](statAry)
        opponentStats[1](opponentStatAry)
        */

        if (oneWhoTriggered === 1){
            changeStats(stats, 0, damage_heal[1], null)
            changeStats(opponentStats, damage_heal[0], 0, null)
        }
        else {
            changeStats(stats, damage_heal[0], 0, null)
            changeStats(opponentStats, 0, damage_heal[1], null)
        }

        endPhase()
        
    })
    socket.off("end-phase-play-face-down")
    socket.on("end-phase-play-face-down", (oneWhoTriggered, counters)=>{
        console.log("end-phase-face-down" + oneWhoTriggered + " " + counters)
        /*
        let statAry = [... stats[0]]
        let opponentStatAry = [... opponentStats[0]]
        if (oneWhoTriggered === 1){
            statAry[4] += counters[4]
            statAry[5] += counters[5]
            statAry[6] += counters[6]
            opponentStatAry[1] +=  counters[1]
            opponentStatAry[2] +=  counters[2]
            opponentStatAry[3] +=  counters[3]
        }
        else {
            statAry[1] += counters[1]
            statAry[2] += counters[2]
            statAry[3] += counters[3]
            opponentStatAry[4] +=  counters[4]
            opponentStatAry[5] +=  counters[5]
            opponentStatAry[6] +=  counters[6]
        }
        stats[1](statAry)
        opponentStats[1](opponentStatAry)
        */
        if (oneWhoTriggered === 1){
            changeStats(stats, 0, 0, [0,0,0,0,counters[4], counters[5], counters[6]])
            changeStats(opponentStats, 0, 0, [0,counters[1], counters[2], counters[3], 0,0,0])
        }
        else {
            changeStats(stats, 0, 0, [0,counters[1], counters[2], counters[3], 0,0,0])
            changeStats(opponentStats, 0, 0,  [0,0,0,0,counters[4], counters[5], counters[6]])
        }

        endPhase()
        
    })
    socket.off("end-phase-stack")
    socket.on("end-phase-stack",(oneWhoTriggered, damage_heal)=>{
        
        console.log(damage_heal)
        if (oneWhoTriggered === 1){


            changeStats(stats, damage_heal[0], 0, null)
            changeStats(opponentStats, 0, damage_heal[1], null)
        }
        else {
            changeStats(stats, 0, damage_heal[1], null)
            changeStats(opponentStats, damage_heal[0], 0, null)
        }
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
                <Card suit={hand[0].suit} value={hand[0].value} slot ={0} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={[playerCard, setPlayerCard]} hand={hand}/>
                <Card suit={hand[1].suit} value={hand[1].value} slot ={1} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={[playerCard, setPlayerCard]} hand={hand}/>
                <Card suit={hand[2].suit} value={hand[2].value} slot ={2} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={[playerCard, setPlayerCard]} hand={hand}/>
                <Card suit={hand[3].suit} value={hand[3].value} slot ={3} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={[playerCard, setPlayerCard]} hand={hand}/>
                <Card suit={hand[4].suit} value={hand[4].value} slot ={4} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={[playerCard, setPlayerCard]} hand={hand}/>
            </div>
            <div className="game--player-moves"></div>
                <GameControlsBar selectionState= {playerCardSelection} hand = {hand} activeCard = {playerCard} activeCardSetter = {setPlayerCard} socket={socket} opponentSocket={pSocket} disabled={controlsDisabled} playerMove={playerMove}/>
            <div className="game--player-stats">
                <GameStatsBar stats={stats}/>
            </div>
        </div>
    )
}
export default CardGame
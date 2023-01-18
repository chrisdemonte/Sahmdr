import "../App.css"
import React from "react"
import Card from "./Card.js"
import GameStatsBar from "./GameStatsBar.js"
import GameControlsBar from "./GameControlsBar.js"
import EndGameMessage from "./EndGameMessage.js"

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

    const playerCardSelection= React.useState(-1) //which card from the hand was clicked last. 0 = not clicked, 1 = clicked
    const opponentCardSelection = React.useState(-1) //which card from the opponent's hand was clicked last. 0 = not clicked, 1 = clicked
    const playerCard = React.useState({"suit": -1, "value" : 0}) //the player's active card from playing a move
    const opponentCard = React.useState({"suit": -1, "value" : 0}) //the opponent's active card from playing a move


    const deck = props.deck         //an array of length 39 with card objects
    const hand = React.useState(props.hand)     //an array of length 5 with card object
    const opponentHand = React.useState([{"suit": 0, "value":0}, {"suit": 0, "value":0},{"suit": 0, "value":0},{"suit": 0, "value":0},{"suit": 0, "value":0}]) //an array of integers with length 5 used to set the display of the opponent's hand. 0 = back of card, -1 = empty slot
    const [nextCard, setNextCard] = React.useState(5)                //a pointer to the next card in your deck
    const [opponentNextCard, setOpponentNextCard] = React.useState(5)
    const phase = React.useState(1)                   //the current phase of the match, 1 means the player with moveFirst==1 is offense and other player is defense. goes between 1 and 0
    const stats = React.useState([50,0,0,0,0,0,0])
    const opponentStats = React.useState([50,0,0,0,0,0,0])
    const playerMove = React.useState(-1)
  
    const controlsDisabled = React.useState(["","","",""])
    const [endGameMessage, setEndGameMessage]= React.useState(<div></div>)

    function drawCard(){
        if (nextCard >= deck.length){
            return 
        }
        /*
        let slot = -1
        for (let i = 0; i < 5; i++){
            if (hand[i].suit === -1){
                slot = i
            }
        }*/
        let tempHand = [...hand[0]]
        tempHand[playerCardSelection[0]] = deck[nextCard]
        //hand[slot] = deck[nextCard]
        hand[1](tempHand)
        setNextCard((prev) => (prev + 1))
    }
    function openToCounter(){
        controlsDisabled[1](["","-disabled","-disabled","-disabled"])
    }

    function changeStats(statState, damage, healing, newCounter){

        let statAry = [...statState[0]]
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
        
        playerCard[1]({"suit": -1, "value" : 0})
        opponentCard[1]({"suit": -1, "value" : 0})
        if (opponentNextCard < 39){
            opponentHand[1]([{"suit": 0, "value":0}, {"suit": 0, "value":0},{"suit": 0, "value":0},{"suit": 0, "value":0},{"suit": 0, "value":0}])
            setOpponentNextCard((prev) => {return prev + 1})
        }
        drawCard()
        playerCardSelection[1](-1)
        opponentCardSelection[1](-1)

        phase[1]((prev) => {
            let newPhase = (prev + 1) % 2
            if (newPhase === moveFirst){
                controlsDisabled[1](["","","",""])
            }
            
            return newPhase
        
        })
        playerMove[1](-1)
        

    }
    function endGameCheck(){
        if (opponentStats[0][0] <= 0 && stats[0][0] <= 0){
            setEndGameMessage(<EndGameMessage message={"It was a tie"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
        if (opponentStats[0][0] <= 0 ){
            setEndGameMessage(<EndGameMessage message={"You Won!"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
        if (stats[0][0] <= 0){
            setEndGameMessage(<EndGameMessage message={"Game Over"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
        if((hand[0][0].suit + hand[0][1].suit + hand[0][2].suit + hand[0][3].suit + hand[0][4].suit) <= -5 ){
            
            if (opponentStats[0][0] === stats[0][0]){
                setEndGameMessage(<EndGameMessage message={"It was a tie"}/>)
            }
            else if (opponentStats[0][0] < stats[0][0] ){
                setEndGameMessage(<EndGameMessage message={"You Won!"}/>)
            }
            else {
                setEndGameMessage(<EndGameMessage message={"Game Over"}/>)
            }
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
    }
    /**
     * OPPONENT SELECT CARD
     * Purely visual. Gives the player an indication of which cards the opponent is clicking in their deck
     */
    socket.off("opponent-select-card")
    socket.on("opponent-select-card", (slot)=>{
        opponentCardSelection[1](slot)
    })

    /**
     * OPPONENT PLAY CARD
     * -Recieve the opponent's card data, and the index of the card's slot in the opponent's hand
     * -If the player recieving this event was the first person to move, that means the opponent was moving second,
     * so the phase is over, and a message is emitted to the server to end the turn
     */
    socket.off("opponent-used-play-card")
    socket.on("opponent-used-play-card", (index, selectedCard)=>{
        
        //Places a blank spot in the opponents hand using the index value
        let tempHand = [...opponentHand[0]]
        tempHand[index] = {"suit": -1, "value": 0}
        opponentHand[1](tempHand)
        //Sets the opponent's card slot to show the card they played
        opponentCard[1](selectedCard)
     
        //if the player moved first, we notify the server to end the turn
        if (phase[0] === moveFirst){
            if (playerMove[0] === 0){
                socket.emit("end-phase-play-card", playerCard[0], selectedCard, pSocket)
            }
            if (playerMove[0] === 1){
                socket.emit("end-phase-play-face-down", playerCard[0], selectedCard, pSocket)
            }
            if (playerMove[0] === 22){
                socket.emit("end-phase-stack",  selectedCard, pSocket)
            }
        } 
        //else the player is the defensive player, and we unluck the interface for them to play a card
        else {
            openToCounter()
        }
    })

   /**
     * OPPONENT PLAY CARD FACE DOWN
     * -Recieve the opponent's card data, and the index of the card's slot in the opponent's hand
     * -IMPORTANT: the selected card value is special for play facedown. Suit = 0 and Value = 0 but it has an additional
     * key-value, card = the card's real data
     * -The player recieving this event will always be the defensive player
     */
    socket.off("opponent-used-play-face-down")
    socket.on("opponent-used-play-face-down", (index, selectedCard)=>{
        
        let tempHand = [...opponentHand[0]]
        tempHand[index] = {"suit": -1, "value": 0}
        opponentHand[1](tempHand)
        opponentCard[1](selectedCard)

        openToCounter()
        
    })
    /**
     * REAVEAL CARD
     * -Using the special data in the facedown card object, we flip the card and reveal the suit and value
     * -If whichCard = 1, we are revealing the player card, else we are revealing the opponent's card
     */
    socket.off("reveal-card")
    socket.on("reveal-card", (whichCard)=>{
        console.log("reaveal:" + whichCard)
        if (whichCard === 1){
            playerCard[1](playerCard[0].card)
        }
        else {
            opponentCard[1](opponentCard[0].card)
        }
    })

    /**
     * STACK 0
     * -Stack is a two part player move. This event indicates the opponent played stack, and puts a facedown card in the
     * opponent's active card slot
     */
    socket.off("opponent-used-stack-0")
    socket.on("opponent-used-stack-0", (index)=>{
        let tempHand = [...opponentHand[0]]
        tempHand[index] = {"suit": -1, "value": 0}
        opponentHand[1](tempHand)
        opponentCard[1]({"suit":0, "value": 0})
    })
    /**
     * STACK 1
     * -This event indicates the opponent played stack part two, and puts a blank slot in the opponent's active card slot
     * and opens up the player to counter
     */
    socket.off("opponent-used-stack-1")
    socket.on("opponent-used-stack-1", ()=>{
        opponentCard[1]({"suit": -1, "value":0})
        openToCounter()
        
    })

    /**
     * END PHASE PLAY CARD
     * -Applys the direct damage or healing based on the cards used
     */
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
        console.log(damage_heal)
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
       console.log(counters)
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
        endPhase()
    })

    React.useEffect(() =>{

        console.log(deck)
        console.log(hand)
       // console.log("movefirst:" + moveFirst)
       // console.log("phase:" + phase)
        if (moveFirst !== phase[0]){
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
    }, [])

    return (

        <div className="game">
            <div className="game--opponent-stats">
                <GameStatsBar stats={opponentStats}/>
            </div>
            <div className="game--opponent-hand">
                <Card card={opponentHand[0][0]} slot ={0} selectionState = {opponentCardSelection}/>
                <Card card={opponentHand[0][1]} slot ={1} selectionState = {opponentCardSelection}/>
                <Card card={opponentHand[0][2]} slot ={2} selectionState = {opponentCardSelection}/>
                <Card card={opponentHand[0][3]} slot ={3} selectionState = {opponentCardSelection}/>
                <Card card={opponentHand[0][4]} slot ={4} selectionState = {opponentCardSelection}/>
            </div>
            <div className="game--opponent-active-card"></div>
                <Card card={opponentCard[0]} slot={5} selectionState = {opponentCardSelection}/>
            <div className="game--player-active-card"></div>
                <Card card={playerCard[0]} slot={5} selectionState = {playerCardSelection}/>
            <div className="game--player-hand">
                <Card card={hand[0][0]} slot ={0} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][1]} slot ={1} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][2]} slot ={2} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][3]} slot ={3} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][4]} slot ={4} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
            </div>
            <div className="game--player-moves"></div>
                <GameControlsBar selectionState= {playerCardSelection} hand = {hand} playerCard={playerCard} socket={socket} opponentSocket={pSocket} disabled={controlsDisabled} playerMove={playerMove}/>
            <div className="game--player-stats">
                <GameStatsBar stats={stats}/>
            </div>
            {endGameMessage}
        </div>
    )
    //return (<h1>Test</h1>)
}
export default CardGame
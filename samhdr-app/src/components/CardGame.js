import "../App.css"
import React from "react"
import Card from "./Card.js"
import GameStatsBar from "./GameStatsBar.js"
import GameControlsBar from "./GameControlsBar.js"
import EndGameMessage from "./EndGameMessage.js"
import song from "../assets/SAMHDR_game_music.mp3"
import ReactAudioPlayer from "react-audio-player"

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
    const playerWildCard = React.useState({"suit": -1, "value": 0})
    const opponentWildCard = React.useState({"suit": -1, "value": 0})

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
    const gameOver = React.useState(false)

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

        if (statAry[0] < 0){
            statAry[0] = 0
        }
        statState[1](statAry)
        return statAry[0]

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
    function endGameCheck(playerHealth, opponentHealth){
        if (playerHealth <= 0 && opponentHealth <= 0){
            setEndGameMessage(<EndGameMessage message={"It was a tie"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
            return true
        }
        if (opponentHealth <= 0 ){
            setEndGameMessage(<EndGameMessage message={"You Won!"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
            return true
        }
        if (playerHealth <= 0){
            setEndGameMessage(<EndGameMessage message={"Game Over"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
            return true
        }
        if((hand[0][0].suit + hand[0][1].suit + hand[0][2].suit + hand[0][3].suit + hand[0][4].suit) <= -5 ){
            
            if (playerHealth === opponentHealth){
                setEndGameMessage(<EndGameMessage message={"It was a tie"}/>)
            }
            else if (opponentHealth < playerHealth ){
                setEndGameMessage(<EndGameMessage message={"You Won!"}/>)
            }
            else {
                setEndGameMessage(<EndGameMessage message={"Game Over"}/>)
            }
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
            return true
        }
        return false
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


        //sets the value of the cards being played according to if they match the wildcards in play
        let tempPlayerCard = playerCard[0]
        let tempOpponentCard = selectedCard

        if (playerWildCard[0].suit > 0 && playerWildCard[0].value === playerCard[0].value){
            tempPlayerCard = {"suit": playerCard[0].suit, "value": 13}
        }
        if (opponentWildCard[0].suit > 0 && opponentWildCard[0].value === selectedCard.value){
            tempOpponentCard = {"suit": selectedCard.suit, "value": 13}
        }
     
        //if the player moved first, we notify the server to end the turn
        if (phase[0] === moveFirst){
            if (playerMove[0] === 0){
                socket.emit("end-phase-play-card", tempPlayerCard, tempOpponentCard, pSocket)
            }
            if (playerMove[0] === 1){
                socket.emit("end-phase-play-face-down", tempPlayerCard, tempOpponentCard, pSocket)
            }
            if (playerMove[0] === 22){
                socket.emit("end-phase-stack",  tempOpponentCard, pSocket)
            }
            if (playerMove[0] === 3){
                socket.emit("end-phase-wildcard", tempOpponentCard, pSocket)
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
     * WILD CARD
     * -This event indicates the opponent played wild card, and puts a blank slot in the opponent's hand 
     * and adds the incoming card to the opponent's wildcard slot
     */
    socket.off("opponent-used-wildcard")
    socket.on("opponent-used-wildcard", (index, selectedCard)=>{
           // opponentCard[1]({"suit": -1, "value":0})
        let tempHand = [...opponentHand[0]]
        tempHand[index] = {"suit": -1, "value": 0}
        opponentHand[1](tempHand)
        opponentWildCard[1](selectedCard)
        openToCounter()
            
    })

    /**
     * END PHASE PLAY CARD
     * -Applys the direct damage or healing based on the cards used
     */
    socket.off("end-phase-play-card")
    socket.on("end-phase-play-card", (oneWhoTriggered, damage_heal)=>{

        let playerHealth = 1
        let opponentHealth = 1
        if (oneWhoTriggered === 1){
            playerHealth = changeStats(stats, 0, damage_heal[1], null)
            opponentHealth =changeStats(opponentStats, damage_heal[0], 0, null)
        }
        else {
            playerHealth = changeStats(stats, damage_heal[0], 0, null)
            opponentHealth =changeStats(opponentStats, 0, damage_heal[1], null)
        }

        let over = endGameCheck(playerHealth, opponentHealth)
        gameOver[1](over)
        if (!over){
            endPhase()
        }
        
    })
    socket.off("end-phase-play-face-down")
    socket.on("end-phase-play-face-down", (oneWhoTriggered, counters)=>{
        //console.log("end-phase-face-down" + oneWhoTriggered + " " + counters)
        //console.log(counters)
        let playerHealth = 1
        let opponentHealth = 1
        if (oneWhoTriggered === 1){
            playerHealth = changeStats(stats, 0, 0, [0,0,0,0,counters[4], counters[5], counters[6]])
            opponentHealth = changeStats(opponentStats, 0, 0, [0,counters[1], counters[2], counters[3], 0,0,0])
        }
        else {
            playerHealth = changeStats(stats, 0, 0, [0,counters[1], counters[2], counters[3], 0,0,0])
            opponentHealth = changeStats(opponentStats, 0, 0,  [0,0,0,0,counters[4], counters[5], counters[6]])
        }

        let over = endGameCheck(playerHealth, opponentHealth)
        gameOver[1](over)
        if (!over){
            endPhase()
        }

        
    })
    socket.off("end-phase-stack")
    socket.on("end-phase-stack",(oneWhoTriggered, damage_heal)=>{
        
        let playerHealth = 1
        let opponentHealth = 1
        if (oneWhoTriggered === 1){
            playerHealth = changeStats(stats, damage_heal[0], 0, null)
            opponentHealth = changeStats(opponentStats, 0, damage_heal[1], null)
        }
        else {
            playerHealth = changeStats(stats, 0, damage_heal[1], null)
            opponentHealth = changeStats(opponentStats, damage_heal[0], 0, null)
        }
        let over = endGameCheck(playerHealth, opponentHealth)
        gameOver[1](over)
        if (!over){
            endPhase()
        }

    })
    socket.off("end-phase-wildcard")
    socket.on("end-phase-wildcard",(oneWhoTriggered, damage_heal)=>{
        
        let playerHealth = 1
        let opponentHealth = 1
        if (oneWhoTriggered === 1){
            playerHealth = changeStats(stats, damage_heal[0], 0, null)
            opponentHealth = changeStats(opponentStats, 0, damage_heal[1], null)
        }
        else {
            playerHealth = changeStats(stats, 0, damage_heal[1], null)
            opponentHealth = changeStats(opponentStats, damage_heal[0], 0, null)
        }
        let over = endGameCheck(playerHealth, opponentHealth)
        gameOver[1](over)
        if (!over){
            endPhase()
        }

    })
    socket.off("opponent-disconnected")
    socket.on("opponent-disconnected", ()=>{
        if (!gameOver[0]){
            setEndGameMessage(<EndGameMessage message={"Your Opponent Disconnected"}/>)
            controlsDisabled[1](["-disabled","-disabled","-disabled","-disabled"])
        }
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

        <div className="game--outer">
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
            <div className="game--opponent-active-card">
                <div className="game--spacer"></div>
                <div className="game--spacer"></div>
                <Card card={opponentCard[0]} slot={5} selectionState = {opponentCardSelection}/>
                <div className="game--spacer"></div>
                <Card card={opponentWildCard[0]} slot ={6} selectionState = {opponentCardSelection}/>
            </div>
            <div className="game--player-active-card">
                <Card card={playerWildCard[0]} slot ={6} selectionState = {playerCardSelection}/>
                <div className="game--spacer"></div>
                <Card card={playerCard[0]} slot={5} selectionState = {playerCardSelection}/>
                <div className="game--spacer"></div>
                <div className="game--spacer"></div>
            </div>
            <div className="game--player-hand">
                <Card card={hand[0][0]} slot ={0} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][1]} slot ={1} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][2]} slot ={2} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][3]} slot ={3} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
                <Card card={hand[0][4]} slot ={4} selectionState = {playerCardSelection} socket={socket} opponentSocket={pSocket} playerMove={playerMove} activeCard={playerCard} hand={hand}/>
            </div>
            <div className="game--player-moves"></div>
                <GameControlsBar selectionState= {playerCardSelection} hand = {hand} playerCard={playerCard} wildCard ={playerWildCard} socket={socket} opponentSocket={pSocket} disabled={controlsDisabled} playerMove={playerMove}/>
            <div className="game--player-stats">
                <GameStatsBar stats={stats}/>
            </div>
            
            {endGameMessage}
        </div>
        <ReactAudioPlayer className="game--music" src={song} autoPlay controls controlslist="play nodownload" loop={true} volume={0.5}/>
        </div>
        
        
    )
    //return (<h1>Test</h1>)
}
export default CardGame
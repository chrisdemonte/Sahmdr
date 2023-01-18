import '../App.css'
import React from 'react'
function GameControlsBar(props){
    
    const [selection, setSelection]= props.selectionState
    const hand = props.hand 
    const [activeCard, setActiveCard] = props.playerCard
    const socket= props.socket 
    const opponentSocket = props.opponentSocket
    const [disabled, setDisabled] = props.disabled
    const [playerMove, setPlayerMove] = props.playerMove

 
    function onPlayCard(){
        
        if (selection < 0){
            return
        }
        let selectedCard = hand[0][selection]
        let tempHand = [...hand[0]]
        tempHand[selection] = {"suit": -1, "value": 0}
        
        hand[1](tempHand)
        setPlayerMove(0)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)
        console.log(selectedCard)

        socket.emit("used-play-card", opponentSocket, selection, selectedCard)
    }

    function onPlayFaceDown(){
       
        if (selection < 0){
            return
        }
        let selectedCard = {"suit": 0, "value": 0, "card": hand[0][selection]}
        let tempHand = [...hand[0]]
        tempHand[selection] = {"suit": -1, "value": 0}
        
        hand[1](tempHand)
        setPlayerMove(1)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)

        socket.emit("used-play-face-down", opponentSocket, selection, selectedCard)
    }

    function onStack(){
        
        if (selection < 0){
            return
        }
        let selectedCard = hand[0][selection]
        let tempHand = [...hand[0]]
        tempHand[selection] = {"suit": -1, "value": 0}
        
        hand[1](tempHand)
        setPlayerMove(2)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)

        socket.emit("used-stack-0", opponentSocket, selection, selectedCard)
    }

    return (
        <div className="game--control-bar">
            <h2 className={"game--control" + disabled[0]} onClick={onPlayCard}> PLAY CARD</h2>
            <h2 className={"game--control" + disabled[1]} onClick={onPlayFaceDown}> PLAY FACE DOWN</h2>
            <h2 className={"game--control" + disabled[2]} onClick={onStack}> STACK</h2>
            <h2 className={"game--control" + disabled[3]}> WILD CARD</h2>
        </div>
    )
}
export default GameControlsBar
import '../App.css'
import React from 'react'
function GameControlsBar(props){
    
    const [selection, setSelection]= props.selectionState
    const hand = props.hand 
    const activeCard = props.activeCard
    const setActiveCard = props.activeCardSetter
    const socket= props.socket 
    const opponentSocket = props.opponentSocket
    const [disabled, setDisabled] = props.disabled
    const [playerMove, setPlayerMove] = props.playerMove

    function getCardIndex(){
        let index = -1
        for (let i = 0; i < selection.length; i++){
            if (selection[i] == 1){
                //selectedCard = hand[i]
                index = i
            }
        }
        return index
    }
    function onPlayCard(){
        let cardIndex = getCardIndex()
        if (cardIndex < 0){
            return
        }
        let selectedCard = hand[cardIndex]
        hand[cardIndex] = activeCard
        
        setPlayerMove(0)
        socket.emit("used-play-card", opponentSocket, cardIndex, selectedCard)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)
    }

    function onPlayFaceDown(){
        let cardIndex = getCardIndex()
        if (cardIndex < 0){
            return
        }
        let selectedCard = {"suit": 0, "value": 0, "card": hand[cardIndex]}
        hand[cardIndex] = activeCard

        setPlayerMove(1)
        socket.emit("used-play-face-down", opponentSocket, cardIndex, selectedCard)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)
    }

    function onStack(){
        let cardIndex = getCardIndex()
        if (cardIndex < 0){
            return
        }
        let selectedCard = hand[cardIndex]
        hand[cardIndex] = activeCard

        setPlayerMove(2)
        socket.emit("used-stack-0", opponentSocket, cardIndex, selectedCard)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)
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
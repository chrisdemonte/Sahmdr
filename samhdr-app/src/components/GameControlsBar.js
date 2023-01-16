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

    function onPlayCard(){
        let selectedCard = -1
        let index = -1
        for (let i = 0; i < selection.length; i++){
            if (selection[i] == 1){
                selectedCard = hand[i]
                index = i
            }
        }
        hand[index] = activeCard
        
        //setSelection([0,0,0,0,0])
        socket.emit("used-play-card", opponentSocket, index, selectedCard)
        setDisabled(["-disabled","-disabled","-disabled","-disabled"])
        setActiveCard(selectedCard)
    }

    return (
        <div className="game--control-bar">
            <h2 className={"game--control" + disabled[0]} onClick={onPlayCard}> PLAY CARD</h2>
            <h2 className={"game--control" + disabled[1]}> PLAY FACE DOWN</h2>
            <h2 className={"game--control" + disabled[2]}> STACK</h2>
            <h2 className={"game--control" + disabled[3]}> WILD CARD</h2>
        </div>
    )
}
export default GameControlsBar
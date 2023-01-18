import '../App.css'
import sword_sym from '../assets/sword_symbol.png'
import arrow_sym from '../assets/arrow_symbol.png'
import magic_sym from '../assets/magic_symbol.png'
import healing_sym from '../assets/healing_symbol.png'
import defense_sym from '../assets/defense_symbol.png'
import resist_sym from '../assets/resistance_symbol.png'
import cardBack from '../assets/card_back_red.png'
import React from 'react'

function Card(props){

    const card = props.card
    const activeCard = props.activeCard
    const [selected, setSelected] = props.selectionState
    const slot = props.slot
    const socket = props.socket
    const opponentSocket = props.opponentSocket
    const playerMove = props.playerMove
    const hand = props.hand
    
    var symbols = [cardBack, sword_sym, arrow_sym, magic_sym , healing_sym ,defense_sym , resist_sym ]
    
    var valDisplay = card.value
    if (valDisplay === 11){
        valDisplay = "J"
    }
    else if (valDisplay === 12){
         valDisplay = "Q"
    }
    else if (valDisplay === 13){
        valDisplay = "K"
    }
   
    var selectionStr = ""
    if (selected === slot){
        selectionStr = "-selected"
    }
    
    

    function selectCard (){ 
        if (playerMove[0] === 2){
            if (card.suit === activeCard[0].suit){
                let newValue = card.value + activeCard[0].value
                let tempHand = [...hand[0]]
                tempHand[slot].value = newValue

                playerMove[1](22)
                hand[1](tempHand)
                activeCard[1]({"suit": -1, "value": 0})

                socket.emit("used-stack-1", opponentSocket)
            }
        }
        else {
            
            setSelected(slot)
            socket.emit("select-card", slot, opponentSocket)
        }
    }



    if (card.suit === -1){
        return (
            <div className={"card"}>
            <div className="card-inner">
            <div className={"card-suit-" + card.suit}>
                    
            </div>
            </div>


        </div>
        )
    }
    if (card.suit === 0 ){
        return (
            <div className={"card"}>
            <div className="card-inner">
                <div className={"card-suit-" + card.suit + selectionStr}>
                </div>
            </div>


        </div>
        )
    }
    return (
        <div className={"card"}>
            <div className="card-inner">
                <div className={"card-suit-" + card.suit + selectionStr} onClick={selectCard}>
                <div className = "card--top-num-container">
                    <h2 className = "card--num">{valDisplay}</h2>
                    <img src={symbols[card.suit]} alt="Swords" className="card--symbol"/>
                </div>

                <div className="card--main-symbols">

                <img src={symbols[card.suit]} alt="Swords" className={"card--main-symbol"} />
                </div>

                <div className = "card--bottom-num-container">
                    <h2 className = "card--num">{valDisplay}</h2>
                    <img src={symbols[card.suit]} alt="Swords" className="card--symbol"/>
                </div>
                </div>
            </div>


        </div>
    )
}
export default Card
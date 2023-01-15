import '../App.css'
import sword_sym from '../assets/sword_symbol.png'
import arrow_sym from '../assets/arrow_symbol.png'
import magic_sym from '../assets/magic_symbol.png'
import healing_sym from '../assets/healing_symbol.png'
import defense_sym from '../assets/defense_symbol.png'
import resist_sym from '../assets/resistance_symbol.png'
import cardBack from '../assets/card_back_red.png'

function Card(props){

    const value = props.value
    var valDisplay = props.value
    if (value == 11){
        valDisplay = "J"
    }
    if (value == 12){
        valDisplay = "Q"
    }
    if (value == 13){
        valDisplay = "K"
    }
    const suit = props.suit
    var symbols = [cardBack, sword_sym, arrow_sym, magic_sym , healing_sym ,defense_sym , resist_sym ]

    if (suit === -1 ){
        return (
            <div className={"card"}>
            <div className="card-inner">
            </div>


        </div>
        )
    }
    if (suit === 0 ){
        return (
            <div className={"card"}>
            <div className="card-inner">
                <div className={"card-suit-" + suit}>
                    <img src={symbols[suit]} alt="Swords" className="card--back"/>
                </div>
            </div>


        </div>
        )
    }
    return (
        <div className={"card"}>
            <div className="card-inner">
                <div className={"card-suit-" + suit}>
                <div className = "card--top-num-container">
                    <h2 className = "card--num">{valDisplay}</h2>
                    <img src={symbols[suit]} alt="Swords" className="card--symbol"/>
                </div>

                <div className="card--main-symbols">

                <img src={symbols[suit]} alt="Swords" className={"card--main-symbol"} />
                </div>

                <div className = "card--bottom-num-container">
                    <h2 className = "card--num">{valDisplay}</h2>
                    <img src={symbols[suit]} alt="Swords" className="card--symbol"/>
                </div>
                </div>
            </div>


        </div>
    )
}
export default Card
import '../App.css'
import sword_sym from '../assets/sword_symbol.png'

function Card(props){

    const suit = 1

    return (
        <div className={"card"}>
            <div className="card-inner">
                <div className={"card-suit-" + suit}>
                <div className = "card--top-num-container">
                    <h2 className = "card--num">1</h2>
                    <img src={sword_sym} alt="Swords" className="card--symbol"/>
                </div>

                <div className="card--main-symbols">

                <img src={sword_sym} alt="Swords" className={"card--main-symbol-" + suit} />
                </div>

                <div className = "card--bottom-num-container">
                    <h2 className = "card--num">1</h2>
                    <img src={sword_sym} alt="Swords" className="card--symbol"/>
                </div>
                </div>
            </div>


        </div>
    )
}
export default Card
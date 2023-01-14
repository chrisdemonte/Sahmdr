import "../App.css"
import Card from "./Card.js"

function StartGameContent(){
    return(
        <div className="main--content">
           <h1>Start Game</h1>
           <div className="test--card-display">
            <Card />
           </div>
        </div>
    )
}
export default StartGameContent
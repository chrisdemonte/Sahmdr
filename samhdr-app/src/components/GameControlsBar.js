import '../App.css'

function GameControlsBar(props){

    return (
        <div className="game--control-bar">
            <h2 className="game--control"> PLAY CARD</h2>
            <h2 className="game--control"> PLAY FACE DOWN</h2>
            <h2 className="game--control"> STACK</h2>
            <h2 className="game--control"> WILD CARD</h2>
        </div>
    )
}
export default GameControlsBar
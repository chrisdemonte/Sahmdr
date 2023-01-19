import "../App.css"
import CardGame from "./CardGame"
import HowToPlayContent from "./HowToPlayContent.js"
import PickSuitsContent from "./PickSuitsContent.js"
import StartGameContent from "./StartGameContent.js"
import React from "react"
function Navbar(props) {

    const socket = props.socket
    const setLayout = props.setLayout
    const name = React.useState("")

    function setHowToPlay (){
        socket.emit("player-left-match")
        setLayout(<HowToPlayContent/>)
        
    }
    function setStartGame (){
        socket.emit("player-left-match")
        setLayout(<PickSuitsContent setLayout={setLayout} socket={socket} name={name}/>)
        
    }
    function setQuitGame (){
        socket.emit("player-left-match")
        setLayout(<StartGameContent socket={socket}/>)
        
    }

    return (
        <nav className="navbar--main">
            
            <h1 className="navbar--title">SAMHDR</h1>
            <ul className="navbar--options">
                <li className="navbar--start" onClick={setStartGame}>Start Game</li>
                <li className="navbar--howto" onClick={setHowToPlay} >How to Play</li>
                <li className="navbar--quit" onClick={setQuitGame}>Quit</li>
            </ul>
        </nav>
    )
    
}
export default Navbar
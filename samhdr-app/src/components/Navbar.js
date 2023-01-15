import "../App.css"
import CardGame from "./CardGame"
import HowToPlayContent from "./HowToPlayContent.js"
import PickSuitsContent from "./PickSuitsContent.js"
import StartGameContent from "./StartGameContent.js"
function Navbar(props) {

    const socket = props.socket
    const setLayout = props.setLayout

    function setHowToPlay (){
        setLayout(<HowToPlayContent/>)
    }
    function setStartGame (){
        setLayout(<PickSuitsContent setLayout={setLayout} socket={socket}/>)
    }
    function setQuitGame (){
        /*
        const setLayout = props.setLayout
        const socket = props.socket
        const name = props.name
        const pSocket = props.pSocket
        const pName = props.pName
        const moveFirst = props.moveFirst
        const selections = props.selections*/
        //var selections = [true, true, true, false, false, false]
        //setLayout(<CardGame setLayout={setLayout} socket={socket} name="Chris" pName="Connor" moveFirst="1" selections={selections}/>)
        setLayout(<StartGameContent/>)
    }

    return (
        <nav className="navbar--main">
            <img className="navbar--logo"></img>
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
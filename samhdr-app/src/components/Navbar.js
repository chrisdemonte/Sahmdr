import "../App.css"
import HowToPlayContent from "./HowToPlayContent.js"
import PickSuitsContent from "./PickSuitsContent.js"
import StartGameContent from "./StartGameContent.js"
function Navbar(props) {

    const setLayout = props.setLayout

    function setHowToPlay (){
        setLayout(<HowToPlayContent/>)
    }
    function setStartGame (){
        setLayout(<PickSuitsContent setLayout={setLayout}/>)
    }
    function setQuitGame (){
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
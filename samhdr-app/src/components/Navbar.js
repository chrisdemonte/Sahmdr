import "../App.css"

function Navbar(props) {

    return (
        <nav className="navbar--main">
            <img className="navbar--logo"></img>
            <h1 className="navbar--title">SAMHDR</h1>
            <ul className="navbar--options">
                <li className="navbar--start" onClick={props.startGame}>Start Game</li>
                <li className="navbar--howto" onClick={props.howToPlay}>How to Play</li>
                <li className="navbar--quit" onClick={props.quitGame}>Quit</li>
            </ul>
        </nav>
    )
    
}
export default Navbar
import "../App.css"

function CardGame(props){
   
    const setLayout = props.setLayout
    const socket = props.socket
    const name = props.name
    const pSocket = props.pSocket
    const pName = props.pName
    const moveFirst = props.moveFirst

    return (
        <div className="game">
            <h1>Game!</h1>
        </div>
    )
}
export default CardGame
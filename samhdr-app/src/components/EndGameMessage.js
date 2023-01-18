import "../App.css"

function EndGameMessage(props){

    const message = props.message

    return (
        <div className="end-game">
            <h1 className="end-game--message">{message}</h1>

        </div>
    )

}

export default EndGameMessage
import '../App.css'

function PlayerChallengeItem(props){

    const hasChallenge = props.hasChallenge
    const pName = props.pName
    const name = props.name
    const socket = props.socket
    const pSocket = props.pSocket

    function acceptChallenge(){
        socket.emit("accept-challenge", name, pName, pSocket)
    }
    function denyChallenge(){
        socket.emit("deny-challenge",  pSocket)
    }

    
    if (hasChallenge){
        return (<div className = "playerListItem"> 
                <h3 className= "playerListItem--name">{pName} has challenged you!</h3>
                <h3 className= "playerListItem--accept-challenge" onClick={acceptChallenge}>Accept</h3>
                <h3 className= "playerListItem--deny-challenge" onClick={denyChallenge}>Deny</h3>
             </div> )
    }
    else {
        return (
            <div className = "playerListItem"> 
                <h3 className= "playerListItem--name">No challenges</h3>
    
             </div> )
    }

}

export default PlayerChallengeItem
import '../App.css'
import React from 'react'

function PlayerListItem(props){

    const pId = props.pId
    const name = props.name
    const ready = props.ready
    const socket =props.socket
    const self = props.self
    const [challengeBtnState, setChallengeBtnState] = React.useState(<h3 className= "playerListItem--challenge" onClick={sendChallenge}>Challenge</h3>)

    function sendChallenge(){
        socket.emit("send-challenge", self, pId)
        setChallengeBtnState(<h3 className= "playerListItem--challenge" >Waiting...</h3>)
    }
    if (ready){
        return (<div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{name}</h3>
            {challengeBtnState}
        </div> )
    }
    else {
       
        return (
            <div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{props.name}</h3>
        </div> )
    }
}

export default PlayerListItem
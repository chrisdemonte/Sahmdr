import '../App.css'
import React from 'react'

function PlayerListItem(props){

    const pId = props.pId
    const pName = props.pName
    const readyState = props.readyState
    const socket =props.socket
    const self = props.self
   // const [challengeBtnState, setChallengeBtnState] = React.useState(<h3 className= "playerListItem--challenge" onClick={sendChallenge}>Challenge</h3> )

    function sendChallenge(){
        socket.emit("send-challenge", self, pId)
      //  setChallengeBtnState(<h3 className= "playerListItem--challenge" >Waiting for response...</h3>)
    }


    
    if (readyState === 1){
        return (<div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{pName}</h3>
            <h3 className= "playerListItem--challenge" onClick={sendChallenge}>Challenge</h3> 
        </div> )
    }
    else if (readyState === 2){
        return (<div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{pName}</h3>
            <h3 className= "playerListItem--challenge" >In Match</h3>
        </div> )
    }
    else if (readyState === 3){
        return (<div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{pName}</h3>
            <h3 className= "playerListItem--challenge" >Waiting for response...</h3>
        </div> )
    }
    else {
        return (
            <div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{pName}</h3>
        </div> )
    }
   
}


export default PlayerListItem
import "../App.css"
import Card from "./Card.js"
import EndGameMessage from "./EndGameMessage.js"
import React from "react"

function StartGameContent(props){
    const socket = props.socket
    const serverStatusText = React.useState(<h2>Server Status: <span className="landing-page--waiting">Waiting...</span></h2>)
    
    React.useEffect( () =>{
        setTimeout( ()=>{
           // console.log("polling server")
        if (socket.connected){
            serverStatusText[1](<h2>Server Status: <span className="landing-page--connected">Online</span></h2>)
        }
        else {
            serverStatusText[1](<h2>Server Status: <span className="landing-page--not-connected">Offline</span></h2>)
        }
        }, 1000)}
    , [])

    
    return(
        <div className="main--content">
            <div className="landing-page">
            <h1>Welcome to SAMHDR!</h1>
            {serverStatusText[0]}

          
     
            
            
            
    
           </div>
        </div>
    )
}
export default StartGameContent
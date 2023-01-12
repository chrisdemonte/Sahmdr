import '../App.css'
import React from 'react'
//import io from 'socket.io-client'

function PickRoom (props){

    const [roomState, setRoomState] = React.useState(<div>Pick a room</div>)
   // const socket = io('http://localhost:22222')
   // socket.on('success', () => {setRoomState(<div>Successfully Connected to the server</div>)})

    function serverReq(){
        //fetch('http://localhost:22222/connect', {mode:'cors'}).then(res=>res.json()).then(data=>console.log(data))
        //fetch('http://localhost:22222/connect', {mode:'cors'}).then(data=>console.log(data.message))
    //    socket.emit("message", "Hello server")
        
    }

    return (
        <div>
            {roomState}
            <button onClick={serverReq}>SERVER</button>
        </div>

    )
}

export default PickRoom
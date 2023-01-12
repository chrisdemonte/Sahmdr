import '../App.css'
import React from 'react'
import io from 'socket.io'

function PickRoom (props){

    const [roomState, setRoomState] = React.useState(<div>Pick a room</div>)

    function serverReq(){
        //fetch('http://localhost:22222/connect', {mode:'cors'}).then(res=>res.json()).then(data=>console.log(data))
        //fetch('http://localhost:22222/connect', {mode:'cors'}).then(data=>console.log(data.message))
        const socket = io('http://localhost:22222')
    }

    return (
        <div>
            {roomState}
            <button onClick={serverReq}>SERVER</button>
        </div>

    )
}

export default PickRoom
import '../App.css'
import React from 'react'
import PlayerListItem from './PlayerListItem.js'
//import io from 'socket.io-client'

function PickRoom (props){

    const socket = props.socket
    const setLayout = props.setLayout
    const name = props.name
    const selections = props.selections
    var otherPlayers = []
    const [roomState, setRoomState] = React.useState(<div></div>)
   // const socket = io('http://localhost:22222')
   // socket.on('success', () => {setRoomState(<div>Successfully Connected to the server</div>)})

   
    
       // console.log(socket.listeners("room-data"))
    
    /**
     * The only solution I could come up with to make a single server request that updates the page
     * Every time the page updates a new room-data listener is added, so as part of the callback function
     * the room-data listener is removed.
     * This prevents eventually adding an arbitrary number of listeners, and allows the socket and listeners
     * to refresh with the page
     */
    socket.on("room-data", (data) => {
        //console.log(data)
        otherPlayers = data
        //console.log(otherPlayers.length)
        let rows = []
        for (let i = 0; i < otherPlayers.length; i++){
            //console.log(i)
            if (otherPlayers[i].name.length > 0){
                //console.log(otherPlayers[i].name)
                let pName = otherPlayers[i].name
                let isReady = otherPlayers[i].ready
                if (otherPlayers[i].id == socket.id){
                    isReady = false
                    pName = pName + " (You)"
                }
                //rows.push(<div key={otherPlayers[i].id}>::: {otherPlayers[i].name} ::: Ready to play : {bool} :::</div>)
                rows.push(<PlayerListItem key={otherPlayers[i].id} name={pName} ready={isReady}/> )
            }
        }
        socket.off("room-data")
        setRoomState(rows)
    })
    
    function serverReq(){
        socket.emit("join-room", name)
        
    }

    /**
     * Called only once at the first render of the page
     */
    React.useEffect(() =>{
        serverReq()
    }, [])

    return (
        <div className="pickRoom">
            <div className="pickRoom--challenges">
                <h2 className="pickRoom--players--title">Challenges</h2>
                <PlayerListItem key="0" name="No challengers"/>
            </div>
            <div className = "pickRoom--players">
                <h2 className="pickRoom--players--title">Online Players</h2>
                {roomState}
                <button className="pickRoom--refresh" onClick={serverReq}>Refresh</button>
            </div>
        </div>

    )
}

export default PickRoom
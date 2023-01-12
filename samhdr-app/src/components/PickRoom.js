import '../App.css'
import React from 'react'
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
                let str = "player" + i
                let bool = "Not ready"
                if (otherPlayers[i].ready){
                    bool = "Ready"
                }
                rows.push(<div key={str}>::: {otherPlayers[i].name} ::: Ready to play : {bool} :::</div>)
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
        <div className="main--content">
            {roomState}
            <button onClick={serverReq}>SERVER</button>
        </div>

    )
}

export default PickRoom
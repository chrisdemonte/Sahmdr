import '../App.css'
import React from 'react'
import PlayerListItem from './PlayerListItem.js'
import PlayerChallengeItem from './PlayerChallengeItem.js'
import CardGame from './CardGame.js'
//import io from 'socket.io-client'

function PickRoom (props){

    const socket = props.socket
    const setLayout = props.setLayout
    const name = props.name
    const selections = props.selections
    var challenges = []
    const [challengeState, setChallengeState] = React.useState(<PlayerChallengeItem hasChallenges={false} />)
    var otherPlayers = []
    var playerListItems = []
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
    socket.off("room-data")
    socket.on("room-data", (data) => {
        console.log(data)
        otherPlayers = data
        //console.log(otherPlayers.length)
        let rows = []
        playerListItems = []
        for (let i = 0; i < otherPlayers.length; i++){
            //console.log(i)
            if (otherPlayers[i].name.length > 0){
                //console.log(otherPlayers[i].name)
                let pName = otherPlayers[i].name
                let challengable = otherPlayers[i].state
                if (otherPlayers[i].id === socket.id){
                    challengable = 0
                    pName = pName + " (You)"
                }
                //rows.push(<div key={otherPlayers[i].id}>::: {otherPlayers[i].name} ::: Ready to play : {bool} :::</div>)
                //rows.push(<PlayerListItem key={otherPlayers[i].id} pId={otherPlayers[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> )
                let playerListItem = <PlayerListItem key={otherPlayers[i].id} pId={otherPlayers[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> 
                playerListItems.push({"id": otherPlayers[i].id, "state": playerListItem})
                rows.push(playerListItem)
            }
        }
        
        setRoomState(rows)
    })
    socket.off("recieve-challenge")
    socket.on("recieve-challenge", (pname, pId)=>{
        console.log("recieved challenge")
        challenges.push({"name": pname, "id": pId})
        if (challenges.length === 1){
            setChallengeState(<PlayerChallengeItem hasChallenge={true} name={name} pname={pname} socket={socket} pSocket={pId}/>)
        }
    })

    socket.off("challenge-accepted")
    socket.on("challenge-accepted", (opponentName, opponentID, moveFirst) =>{
        setLayout(<CardGame socket={socket.id} name={name} pName={opponentName} pSocket={opponentID} moveFirst={moveFirst} setLayout={setLayout}/>)
    })

    socket.off("challenge-denied")
    socket.on("challenge-denied", (opponentName, opponentID)=>{
        let i = 0
        let rows = []
        while (i < playerListItems.length){
            if (opponentID === playerListItems[i].id){
                playerListItems[i].state = <PlayerListItem key={opponentID} pId={opponentID} self={name} name={opponentName} readyState={1} socket={socket}/>
            }
            rows.push(playerListItems[i].state)
            i++
        }
        setChallengeState(rows)
    })
    socket.off("remove-challenger")
    socket.on("remove-challenger", ()=>{
        challenges.shift()
        if (challenges.length > 0){
            setChallengeState(<PlayerChallengeItem hasChallenge={true} name={name} pname={challenges[0].name} socket={socket} pSocket={challenges[0].id}/>)
        }
        else {
            setChallengeState(<PlayerChallengeItem hasChallenge={false} name={name}  pname="" pSocket ="" socket={socket} />)
        
        }
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
                {challengeState}
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
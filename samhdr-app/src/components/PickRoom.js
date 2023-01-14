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
   // var buttonStates = []
    const [challengeState, setChallengeState] = React.useState(<PlayerChallengeItem hasChallenges={false} />)
   // var players = {}
   // var keys = []
    var playerListItems = []
    const [roomState, setRoomState] = React.useState(<div></div>)
   // const socket = io('http://localhost:22222')
   // socket.on('success', () => {setRoomState(<div>Successfully Connected to the server</div>)})

   
    
       // console.log(socket.listeners("room-data"))
    
    function generateRoom(players, keys){
        //let rows = []
        
        playerListItems = []
        let player = null
        //console.log("GE " + players)
        //console.log("GR " + keys)
        for (let i = 0; i < keys.length; i++){
            //console.log(i)
            player = players[keys[i]]
            console.log(player)
            if (player.name.length > 0){
                //console.log(players[i].name)
                let pName = player.name
                let state = player.state
                if (keys[i] === socket.id){
                    state = 0
                    pName = pName + " (You)"
                }
                else if (typeof player.incomingChallenges[socket.id] === "undefined") {
                    state = player.state
                }
                else {
                    state = 3
                }
                console.log(state)
                //rows.push(<div key={otherPlayers[i].id}>::: {otherPlayers[i].name} ::: Ready to play : {bool} :::</div>)
                //rows.push(<PlayerListItem key={otherPlayers[i].id} pId={otherPlayers[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> )
                //let playerListItem = <PlayerListItem key={players[i].id} pId={players[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> 
                playerListItems.push(<PlayerListItem key={keys[i]} pId={keys[i]} self={name} pName={pName} readyState={state} socket={socket}/> )
                //rows.push(playerListItem)
            }
            else {
                playerListItems.push(<div key={"blank-player-" + i}></div>)
            }
        }
        
        setRoomState(playerListItems)

    }
    function updateChallenges(players){
                //if (challenges.length === 1){
        let challengeKeys = players[socket.id].challengeKeys
        console.log(players[socket.id])
        console.log(challengeKeys)
        
        if (challengeKeys.length > 0){
            let challenger = players[socket.id].incomingChallenges[challengeKeys[0]]
            setChallengeState(<PlayerChallengeItem hasChallenge={true} self={name} pName={challenger} socket={socket} pSocket={challengeKeys[0]}/>)
        }
        else {
            setChallengeState(<PlayerChallengeItem hasChallenges={false} />)
        }
    }
    /*
    function generateRoom(){
        //let rows = []
        playerListItems = []
        let keys = players.keys()
        
        for (let i = 0; i < players.length; i++){
            //console.log(i)
            if (players[i].name.length > 0){
                //console.log(players[i].name)
                let pName = players[i].name
                let challengable = players[i].state
                if (players[i].id === socket.id){
                    challengable = 0
                    pName = pName + " (You)"
                }
                //rows.push(<div key={otherPlayers[i].id}>::: {otherPlayers[i].name} ::: Ready to play : {bool} :::</div>)
                //rows.push(<PlayerListItem key={otherPlayers[i].id} pId={otherPlayers[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> )
                //let playerListItem = <PlayerListItem key={players[i].id} pId={players[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> 
                playerListItems.push(<PlayerListItem key={players[i].id} pId={players[i].id} self={name} name={pName} readyState={challengable} socket={socket}/> )
                //rows.push(playerListItem)
            }
            else {
                playerListItems.push(<div></div>)
            }
        }
        
        setRoomState(playerListItems)

    }
*/

    
    /**
     * The only solution I could come up with to make a single server request that updates the page
     * Every time the page updates a new room-data listener is added, so as part of the callback function
     * the room-data listener is removed.
     * This prevents eventually adding an arbitrary number of listeners, and allows the socket and listeners
     * to refresh with the page
     */
    socket.off("room-data")
    socket.on("room-data", (players, keys) => {
       // console.log("EH " + players)
       // console.log("EH " + keys)
      //  players = players
      //  keys = keys
        generateRoom(players, keys)
        updateChallenges(players)
        //console.log(players.length)

    })

    socket.off("recieve-challenge")
    socket.on("recieve-challenge", (players)=>{
       // console.log("recieved challenge")
       // challenges.push({"name": pname, "id": pId})
        updateChallenges(players)
    })

    socket.off("challenge-accepted")
    socket.on("challenge-accepted", (opponentName, opponentID, moveFirst) =>{
        setLayout(<CardGame socket={socket.id} name={name} pName={opponentName} pSocket={opponentID} moveFirst={moveFirst} setLayout={setLayout}/>)
    })

    socket.off("challenge-denied")
    socket.on("challenge-denied", (opponentName, opponentID)=>{
        
    })
    /*
    socket.off("remove-challenger")
    socket.on("remove-challenger", ()=>{
        challenges.shift()
        if (challenges.length > 0){
            setChallengeState(<PlayerChallengeItem hasChallenge={true} name={name} pname={challenges[0].name} socket={socket} pSocket={challenges[0].id}/>)
        }
        else {
            setChallengeState(<PlayerChallengeItem hasChallenge={false} name={name}  pname="" pSocket ="" socket={socket} />)
        
        }
    })*/


    function serverReq(){
        socket.emit("join-room", name, 1)
        
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
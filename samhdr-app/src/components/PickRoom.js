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
    const volume = props.volume

    const [challengeState, setChallengeState] = React.useState(<PlayerChallengeItem hasChallenges={false} />)
    var playerListItems = []
    const [roomState, setRoomState] = React.useState(<div></div>)
    
    function generateRoom(players, keys){
        //let rows = []
        
        playerListItems = []
        let player = null

        for (let i = 0; i < keys.length; i++){
           
            player = players[keys[i]]
            console.log(player)
            if (player.name.length > 0){
           
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
                playerListItems.push(<PlayerListItem key={keys[i]} pId={keys[i]} self={name} pName={pName} readyState={state} socket={socket}/> )
          
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

    function generateDeck(deck){
        let cardNames = ["", "Swords", "Arrows", "Magic", "Healing", "Defense", "Resistance"]
        let suits = []
        for (let i = 0; i < selections.length; i++){
            if (selections[i]){
                suits.push(i + 1)
            }
        }
        for (let j = 0; j < suits.length; j++){
            for (let k = 1; k < 11; k++){
                deck.push({"value": k, "suit": suits[j], "name": `${k} of ${cardNames[suits[j]]}`})
            }
            deck.push({"value": 11, "suit": suits[j], "name": `Jack of ${cardNames[suits[j]]}`})
            deck.push({"value": 12, "suit": suits[j], "name": `Queen of ${cardNames[suits[j]]}`})
            deck.push({"value": 13, "suit": suits[j], "name": `King of ${cardNames[suits[j]]}`})
        }
    } 
    function shuffleDeck(deck){
        let range = 0
        let swap
        for (let a = deck.length - 1; a > 0; a-- ){
            range = Math.floor(Math.random() * a)
            swap = deck[range]
            deck[range] = deck[a]
            deck[a] = swap
        }
    }
    
    /**
     * The only solution I could come up with to make a single server request that updates the page
     * Every time the page updates a new room-data listener is added, so as part of the callback function
     * the room-data listener is removed.
     * This prevents eventually adding an arbitrary number of listeners, and allows the socket and listeners
     * to refresh with the page
     */
    socket.off("room-data")
    socket.on("room-data", (players, keys) => {

        generateRoom(players, keys)
        updateChallenges(players)
     
    })

    socket.off("recieve-challenge")
    socket.on("recieve-challenge", (players)=>{

        updateChallenges(players)
    })

    socket.off("challenge-accepted")
    socket.on("challenge-accepted", (opponentName, opponentID, moveFirst) =>{
      //  setLayout(<CardGame socket={socket.id} name={name} pName={opponentName} pSocket={opponentID} moveFirst={moveFirst} setLayout={setLayout}/>)
        
        var deck = []
        generateDeck(deck)
        shuffleDeck(deck)
        shuffleDeck(deck)

        var hand = [deck[0],deck[1],deck[2],deck[3],deck[4]]

        socket.off("room-data")
        socket.off("recieve-challenge")
        socket.off("challenge-denied")
        socket.off("challenge-accepted")
    
        setLayout(<CardGame setLayout={setLayout} socket={socket} name={name} pName={opponentName} pSocket={opponentID} moveFirst={moveFirst} deck={deck} hand={hand} volume={volume}/>)
    })

    socket.off("challenge-denied")
    socket.on("challenge-denied", (opponentName, opponentID)=>{
        
    })

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
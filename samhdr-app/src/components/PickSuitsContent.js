import "../App.css"
import React from 'react'
import PickRoom from "./PickRoom.js";


function PickSuitsContent(props){

    const socket = props.socket
    const setLayout = props.setLayout
    const [name, setName] = props.name
    var suits = 0;
    var selections = [false,false,false,false,false,false]; 
    const [swordState, setSwordState] = React.useState(<h1 className="suit-button" onClick={toggleSwords}>Swords</h1>)
    const [arrowState, setArrowState] = React.useState(<h1 className="suit-button" onClick={toggleArrows}>Arrows</h1>)
    const [magicState, setMagicState] = React.useState(<h1 className="suit-button" onClick={toggleMagic}>Magic</h1>)
    const [healingState, setHealingState] = React.useState(<h1 className="suit-button" onClick={toggleHealing}>Healing</h1>)
    const [defenseState, setDefenseState] = React.useState(<h1 className="suit-button" onClick={toggleDefense}>Defense</h1>)
    const [resistanceState, setResistanceState] = React.useState(<h1 className="suit-button" onClick={toggleResistance}>Resistance</h1>)
    const [startGameState, setStartGameState ] = React.useState(<h1 className="start-game-btn" onClick={startGame} >Start Game</h1>)
    
    const nameEntryHandler = event =>{
        
        setName(event.target.value)
        //Declaring the function inside this event handler so the name value is not a stale state when you press the start game button
        function startGame2(){
            if (suits === 3 && event.target.value.length > 0){
                setLayout(<PickRoom setLayout={setLayout} socket={socket} name={event.target.value} selections={selections} />)
            }
        }
        setNameEntryState(<input type="text" className="name-entry" onChange={nameEntryHandler} value={event.target.value}></input>)
        setStartGameState(<h1 className="start-game-btn" onClick={startGame2}>Start Game</h1>)
    }
 
    const [nameEntry, setNameEntryState] = React.useState(<input type="text" className="name-entry" onChange={nameEntryHandler} value={name} ></input>)
   
    
    
    function toggleSwords(){
        if (selections[0] === true){
            suits--;
            selections[0] = false
            setSwordState(<h1 className="suit-button" onClick={toggleSwords}>Swords</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[0] = true
            setSwordState(<h1 className="suit-button-selected" onClick={toggleSwords}>Swords</h1>)
        }
    }
    function toggleArrows(){
        if (selections[1] === true){
            suits--;
            selections[1] = false
            setArrowState(<h1 className="suit-button" onClick={toggleArrows}>Arrows</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[1] = true
            setArrowState(<h1 className="suit-button-selected" onClick={toggleArrows}>Arrows</h1>)
        }
    }
    function toggleMagic(){
        if (selections[2] === true){
            suits--;
            selections[2] = false
            setMagicState(<h1 className="suit-button" onClick={toggleMagic}>Magic</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[2] = true
            setMagicState(<h1 className="suit-button-selected" onClick={toggleMagic}>Magic</h1>)
        }
    }
    function toggleHealing(){
        if (selections[3] === true){
            suits--;
            selections[3] = false
            setHealingState(<h1 className="suit-button" onClick={toggleHealing}>Healing</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[3] = true
            setHealingState(<h1 className="suit-button-selected" onClick={toggleHealing}>Healing</h1>)
        }
    }
    function toggleDefense(){
        if (selections[4] === true){
            suits--;
            selections[4] = false
            setDefenseState(<h1 className="suit-button" onClick={toggleDefense}>Defense</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[4] = true
            setDefenseState(<h1 className="suit-button-selected" onClick={toggleDefense}>Defense</h1>)
        }
    }
    function toggleResistance(){
        if (selections[5] === true){
            suits--;
            selections[5] = false
            setResistanceState(<h1 className="suit-button" onClick={toggleResistance}>Resistance</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[5] = true
            setResistanceState(<h1 className="suit-button-selected" onClick={toggleResistance}>Resistance</h1>)
        }
    }
    
    function startGame(){
        if (suits === 3 && name.length > 0){
            setLayout(<PickRoom setLayout={setLayout} socket={socket} name={name} selections={selections} />)
        }
    }


   
    return (
        <div className="main">
            <div className="pick-suits--content">
                <h1>Enter Your Name:</h1>
                {nameEntry}
                <h1>Pick Three Suits:</h1>
                {swordState}
                {arrowState}
                {magicState}
                {healingState}
                {defenseState}
                {resistanceState}
                {startGameState}
            </div>
        </div>
    )
}

export default PickSuitsContent
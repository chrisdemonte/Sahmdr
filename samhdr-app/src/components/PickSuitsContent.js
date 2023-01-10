import "../App.css"
import React from 'react'
import SuitButton from "./SuitButton.js"

function PickSuitsContent(props){
/*
    const [suits, setSuits] = React.useState(0, )
    const incSuits = () => {

        setSuits(prev => prev + 1)
        console.log(suits)
    }
    const decSuits = () => {

        setSuits(prev => prev - 1)
    }

    const selectionStates = []
    const [swordSelected, setSwordSelected] = React.useState(false)
    selectionStates.push(React.useState(false))
    selectionStates.push(React.useState(false))
    selectionStates.push(React.useState(false))
    selectionStates.push(React.useState(false))
    selectionStates.push(React.useState(false))

*/
    var suits = 0;
    var selections = [false,false,false,false,false,false]; 
    var names = ["Swords", "Arrows", "Magic", "Healing", "Defense", "Resistance"]
    /*
    const turnSwordsOn = () =>{
        if (suits < 3){
            setSuits(prev => prev + 1)
            setSwordSelected(true)
            setSwordState(<h1 className="suit-button-selected" onClick={turnSwordsOff}>Swords</h1>)
            console.log(suits)
            console.log(swordSelected)
        }
        console.log(suits)
        console.log(swordSelected)
    }
    const turnSwordsOff = () =>{
        if (swordSelected == true){
            setSuits(prev => prev - 1)
            setSwordSelected(false)
            setSwordState(<h1 className="suit-button" onClick={turnSwordsOn}>Swords</h1>)
        }
        console.log(suits)
        console.log(swordSelected)
    }*/
    function toggleSwords(){
        if (selections[0] == true){
            suits--;
            selections[0] = false
            setSwordState(<h1 className="suit-button" onClick={toggleSwords}>Swords</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[0] = true
            setSwordState(<h1 className="suit-button-selected" onClick={toggleSwords}>Swords</h1>)
        }
        console.log(suits)
        console.log(selections[0])
    }

    const [swordState, setSwordState] = React.useState(<h1 className="suit-button" onClick={toggleSwords}>Swords</h1>)

    function toggleArrows(){
        if (selections[1] == true){
            suits--;
            selections[1] = false
            setArrowState(<h1 className="suit-button" onClick={toggleArrows}>Arrows</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[1] = true
            setArrowState(<h1 className="suit-button-selected" onClick={toggleArrows}>Arrows</h1>)
        }
        console.log(suits)
        console.log(selections[1])
    }

    const [arrowState, setArrowState] = React.useState(<h1 className="suit-button" onClick={toggleArrows}>Arrows</h1>)

    function toggleMagic(){
        if (selections[2] == true){
            suits--;
            selections[2] = false
            setMagicState(<h1 className="suit-button" onClick={toggleMagic}>Magic</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[2] = true
            setMagicState(<h1 className="suit-button-selected" onClick={toggleMagic}>Magic</h1>)
        }
        console.log(suits)
        console.log(selections[2])
    }

    const [magicState, setMagicState] = React.useState(<h1 className="suit-button" onClick={toggleMagic}>Magic</h1>)

    function toggleHealing(){
        if (selections[3] == true){
            suits--;
            selections[3] = false
            setHealingState(<h1 className="suit-button" onClick={toggleHealing}>Healing</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[3] = true
            setHealingState(<h1 className="suit-button-selected" onClick={toggleHealing}>Healing</h1>)
        }
        console.log(suits)
        console.log(selections[3])
    }

    const [healingState, setHealingState] = React.useState(<h1 className="suit-button" onClick={toggleHealing}>Healing</h1>)

    function toggleDefense(){
        if (selections[4] == true){
            suits--;
            selections[4] = false
            setDefenseState(<h1 className="suit-button" onClick={toggleDefense}>Defense</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[4] = true
            setDefenseState(<h1 className="suit-button-selected" onClick={toggleDefense}>Defense</h1>)
        }
        console.log(suits)
        console.log(selections[4])
    }

    const [defenseState, setDefenseState] = React.useState(<h1 className="suit-button" onClick={toggleDefense}>Defense</h1>)

    function toggleResistance(){
        if (selections[5] == true){
            suits--;
            selections[5] = false
            setResistanceState(<h1 className="suit-button" onClick={toggleResistance}>Resistance</h1>)
        }
        else if (suits < 3){
            suits++;
            selections[5] = true
            setResistanceState(<h1 className="suit-button-selected" onClick={toggleResistance}>Resistance</h1>)
        }
        console.log(suits)
        console.log(selections[5])
    }

    const [resistanceState, setResistanceState] = React.useState(<h1 className="suit-button" onClick={toggleResistance}>Resistance</h1>)


    //console.log(selectionStates)
    

    return (
        <div className="main">
            <div className="pick-suits--content">
                <h1>Pick Three Suits:</h1>
                {swordState}
                {arrowState}
                {magicState}
                {healingState}
                {defenseState}
                {resistanceState}
                <h1 className="start-game-btn">Start Game</h1>
            </div>
        </div>
    )
}

export default PickSuitsContent
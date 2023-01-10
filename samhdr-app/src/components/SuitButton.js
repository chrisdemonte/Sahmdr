import '../App.css'
import React from 'react'

function SuitButton(props){
//<SuitButton name="Swords" numSuits={numSuits[0]} numSuitsSetter={numSuits[1]} selectionState={selectionStates[0][0]} selectionStateSetter={selectionStates[0][1]}/>
                
    //console.log(props)
    const name = props.name
    const [suits, setSuits] = props.suitState
    const [selected, setSelected] = props.selectionState
    const [btnState, setState] = React.useState(<h1 className="suit-button" onClick={toggleState}>{name}</h1>)
        //return (jpx)}
        


   // var selectedInternal = false
    
   function toggleState(){
    //console.log("inside toggle state")
    if (selected === true) {
        console.log("selected == true")
        setSuits(prev => prev - 1)
        setSelected(false)
        setState(<h1 className="suit-button" onClick={toggleState} >{name}</h1>)
    }
    else if (suits < 3){
        console.log("selected == false and num suits < 3")
        setSuits(prev => prev + 1)
        setSelected(true)
        //setNumSuits(1)
        setState(<h1 className="suit-button-selected" onClick={toggleState}>{name}</h1>)
    }
    console.log(suits)

    
}


    return(btnState)

}

export default SuitButton
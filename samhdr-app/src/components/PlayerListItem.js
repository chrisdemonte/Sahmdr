import '../App.css'


function PlayerListItem(props){

    const key = props.key
    const name = props.name
    const ready = props.ready
    if (ready){
        return (<div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{name}</h3>
            <h3 className= "playerListItem--challenge">Challenge</h3>
        </div> )
    }
    else {
       
        return (
            <div className = "playerListItem"> 
            <h3 className= "playerListItem--name">{props.name}</h3>
        </div> )
    }
}

export default PlayerListItem
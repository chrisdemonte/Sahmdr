import "../App.css"
import Card from "./Card.js"

function StartGameContent(){
    return(
        <div className="main--content">
           <h1>Welcome to SAMHDR!</h1>
           <div className="test--card-display">
            <div><Card suit={1} value={1} /></div>
            <div><Card suit={2} value={5}/></div>
            <div><Card suit={3} value={10}/></div>
            <div><Card suit={4} value={11}/></div>
            <div><Card suit={5} value={12}/></div>
            <div><Card suit={6} value={13}/></div>
            <div><Card suit={0} value={1}/></div>
            <div><Card suit={-1} value={1}/></div>
            
            
            
            
            
           </div>
        </div>
    )
}
export default StartGameContent
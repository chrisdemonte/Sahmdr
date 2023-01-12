import '../App.css'
import React from "react"
import HowToPlayContent from './HowToPlayContent.js'

function MainContent(props){
    //const [content, setContent] = React.useState(<HowToPlayContent />)
    //const socket = props.socket
    const content = props.content

    return (
        <div className="main" key ="main">
           {content}
        </div>
    )
}
export default MainContent
// <div className="main--content" key="main--content">{content}</div>
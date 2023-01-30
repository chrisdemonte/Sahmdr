import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import io from 'socket.io-client';


//const filereader = new FileReader()
//const key = filereader.readAsText('./ssl/samhdr-server-key.txt')


var socket 

try {
 // socket = io('http://54.83.240.243:2020')//,{
 //  key: fs.readFileSync('../ssl/samhdr-server-key')})
  //  cert: reader.readAsText("../ssl/samhdr-cert.pem"),
  //  ca: [
  //    reader.readAsText("../ssl/samhdr-server-cert.pem")
  //  ]
 // });
  socket = io('localhost:2020')
  //socket = io('samhdr-load-balancer-716332415.us-east-1.elb.amazonaws.com:2020')
}
catch (error){
  
}

/*
window.addEventListener("beforeunload", (ev) => 
{  
    //socket.emit("player-disconnect")
    socket.disconnect()
});*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import './App.css';
import React,  {useEffect, useState} from "react";
import Pusher from "pusher-js";
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chatbar/Chat';
import axios from './axios';

function App() {
  let [messages, setMessages] = useState();
  useEffect(()=>{
    axios.get("http://localhost:4000/api/v1/messages")
    .then((response)=>{
      const data = response.data.dbMessage
      setMessages(data)
    })
    .catch((err)=>console.log(err))
    
  },[]);

  useEffect(()=>{
     const pusher = new Pusher('5bae0affad70967e94ca', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) =>{
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    })
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);

  return (

    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat messages ={messages} />
      </div>
    </div>
  );
}

export default App;

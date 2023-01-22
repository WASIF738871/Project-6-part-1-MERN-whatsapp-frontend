import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import React, { useState } from 'react'
import axios from '../../axios';
import './Chat.css';

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/api/v1/messages/new", {
      name: "Demo-name",
      message: input,
      createdAt: new Date().toUTCString(),
      received: false,
    });
    setInput("");
  }
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__headerInfo'>
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages && messages.length > 0 && messages.map(({ name, message, createdAt, received }) => (
          <p className={`chat__message  ${(received === false) && "chat__receiver"}`}>
            <span className='chat__name'> {name} </span>

            {message}

            <span className='chat__timestamp'>{createdAt}</span>
          </p>
        )
        )}

      </div>
      <div className='chat__footer'>
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text' />
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
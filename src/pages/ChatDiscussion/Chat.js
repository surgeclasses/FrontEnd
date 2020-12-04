import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={
            "https://image.similarpng.com/very-thumbnail/2020/05/Modern-WhatsApp-icon-PNG.png"
          }
          alt=""
        />
        <div className="chat__headerInfo">
          <h3>RoomName</h3>
        </div>
        <div className="chat__headerRight">
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

      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Yash</span>
          Hello Raman. What are you doing?
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">Raman</span>
          Hello Yash
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">Raman</span>
          I am busy in Frontend development.
        </p>

        <p className="chat__message">
          <span className="chat__name">Yash</span>
          Good. I am seeing backend.
        </p>
        <p className="chat__message">
          <span className="chat__name">Yash</span>
          Cool
        </p>

      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type in a message..."
          />
          <button type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

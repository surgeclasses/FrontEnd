import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  VALIDATOR_REQUIRE} from "../../util/validators";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const receiver_email = useParams().email;
  const receiver_name = useParams().name;

  const [formState, inputHandler] = useForm(
    {
      input_message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/discussionPage/${receiver_email}`,
        "POST",
        JSON.stringify({
          message: formState.inputs.input_message.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(formState.inputs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/discussionPage/${receiver_email}`,
          "GET",
          null
        );
        setMessages(responseData.chats);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessage();
  }, [messages]);

  return receiver_email ? (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={
            "https://img.icons8.com/cotton/2x/chat.png"
          }
          alt=""
        />
        <div className="chat__headerInfo">
          <h3> {receiver_name} </h3>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          {/* <IconButton>
            <AttachFile />
          </IconButton> */}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <React.Fragment>
        <div className="chat__body">
          {messages.map((message) => (
            <p
              className={`chat__message ${
                message.email === receiver_email && "chat__receiver"
              }`}
            >
              {message.message}
            </p>
          ))}
        </div>

        <div className="chat__footer">
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <form onSubmit={submitHandler}>
            <div>
            <Input
              id="input_message"
              type="text"
              element="input"
              errorText="Enter a valid message"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              value=""
              placeholder="Type in a message..."
              className="chat_footer-input"
            />
            </div>
            <div>
            <button
              type="submit"
            >
              Send Message
            </button>
            </div>

            {/* <input
              id="input_message"
              type="text"
              placeholder="Type in a message..."
              onInput={inputHandler}
            />
            <div>
              <button type="submit" onClick={()=>console.log("Raman is clicking Button")}>Send a message </button>
            </div> */}
          </form>
          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </React.Fragment>
    </div>
  ) : (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={
            "https://img.icons8.com/cotton/2x/chat.png"
          }
          alt=""
        />
        <div className="chat__headerInfo">
          <h3> SurgeChat </h3>
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
      <div className="surgeChat-default"> Welcome to Surge Chat </div>
    </div>
  );
};

export default Chat;

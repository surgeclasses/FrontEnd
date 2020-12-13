import React, { useState, useContext, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import SidebarChat from "./SidebarChat";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { AuthContext } from "../../context/auth-context";
import StartChat from "./StartChat";
import MyButton from "../../components/Button";

const ChatUser = () => {
  const auth = useContext(AuthContext);
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const startChat = (user_id) => {
    return (
      <div>
        {
          <Router>
            
          </Router>
        }
        alert("Main Chal raha hu.. bas room nahi create kar raha");
      </div>
    );
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/discussionPage/chatusers`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            // Authorization: 'Bearer '+ auth.token
          }
        );
        setLoadedUsers(responseData);
        // console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="sidebar__header">
          <Avatar
            src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
            alt="Raman"
          />
          <div className="sidebar__headerRight">
            <div class="dropdown">
              <IconButton class="dropbtn" >
                <ChatIcon />
              </IconButton>
              <div class="dropdown-content">
                {loadedUsers &&
                  loadedUsers.map((user) => {
                    if (user.email !== auth.email) {
                      return (
                        <a> {user.name}
                        <MyButton className="join-button" to={`/startChat/${user._id}`}> start chat </MyButton>
                        </a>);
                    }
                  })}
              </div>
            </div>
            {/* <IconButton>
              <DonutLargeIcon />
            </IconButton> */}
            {/* <IconButton class="dropbtn">
              <ChatIcon />
            </IconButton> */}
            {/* <IconButton>
              <MoreVertIcon />
            </IconButton> */}
          </div>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" type="text" />
          </div>
        </div>
        <div className="sidebar__chats">
          {/* {loadedUsers &&
            loadedUsers.map((user) => {
              if(user.email!==auth.email){
                  return ( <SidebarChat users={user} /> );
              }
              })} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatUser;

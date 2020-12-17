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

const ChatUser = ({ senduserid }) => {
  const auth = useContext(AuthContext);
  const userid = auth.userid;
  const [isVisible, setVisible] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [roomUser, setRoomUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  useEffect(() => {
    const fetchRoomUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/discussionPage/user/${userid}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setRoomUser(responseData);
        // alert(` calling maharaj: ${auth.userid} ${responseData}`);
        console.log({ hvdfvbfhikfkffbdk: userid });
      } catch (err) {
        console.log(err);
      }
    };
    if (userid) {
      fetchRoomUser();
    }
  }, [userid]);

  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="sidebar__header">
          <Avatar
            src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
            alt="Raman"
          />
          <div className="sidebar__headerRight">
            <div class="dropdownn">
              <IconButton
                class="dropbtnn"
                onClick={() => setVisible(!isVisible)}
              >
                <ChatIcon />
              </IconButton>
              {isVisible && (
                <div class="dropdownn-content">
                  {loadedUsers &&
                    loadedUsers.map((user) => {
                      if (user.email !== auth.email) {
                        return (
                          <a>
                            {user.name}
                            <MyButton
                              className="join-button"
                              onClick={() => {
                                senduserid(user._id);
                                setVisible(!isVisible);
                              }}
                            >
                              start chat
                            </MyButton>
                          </a>
                        );
                      }
                    })}
                </div>
              )}
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
          {userid && roomUser && 
          roomUser.map((userinfo) => { 
            <SidebarChat userinfo={userinfo} /> 
            })
          }

          {/* {roomUser.map((value, index) => {
            return <h1> {value} </h1>;
          })} */}

        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatUser;

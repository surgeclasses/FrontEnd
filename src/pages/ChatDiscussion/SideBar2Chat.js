import React, { useState, useContext, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { useParams } from "react-router-dom";
import ChatUser from './ChatUser';
import Chat from './Chat';

const SideBar2Chat=()=>{

  const roomId= useParams().roomid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [user_id,setuser_id] = useState(null);
  const [RoomID, setRoomID] = useState(null);
  const [NewRoomId, SetNewRoomId] = useState(null);


  const fetchRoomID_or_Null = async (uid) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/discussionPage/${auth.userid}/${uid}`
      );
       console.log({Roomidapnawala: responseData.roomid});
      setRoomID(responseData.roomid);
      if(responseData.roomid===null){
        createNewRoom(uid);}
      
    } catch (err) { 
      console.log(err);
    }
  };

  const createNewRoom = async (uid) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/discussionPage/${auth.userid}/${uid}`,
        "POST",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setRoomID(responseData.roomId);
    } catch (err) {
      console.log(err);
    }
    // alert("Room created");
    // console.log({Roomid: {RoomID}});
  }

  const getuserId = (uid) => {

    console.log({pribntinUID: uid})
    setuser_id(uid);
    
    fetchRoomID_or_Null(uid);

    
  }


  return (
    <div className = "chatApp">
    <div className = "chatApp__body">
      <ChatUser senduserid={getuserId}/>
      { <Chat roomid={roomId} />}
    </div>
</div>
  )
}

export default SideBar2Chat;

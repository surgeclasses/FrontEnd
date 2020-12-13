import React, { useState, useContext, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { useParams } from "react-router-dom";
import ChatApp from "./ChatApp";

const StartChat = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const user_id = useParams().uid;

  const [RoomID, setRoomID] = useState(1234);
  const [NewRoomId, SetNewRoomId] = useState(1234);

  useEffect(() => {
    const fetchRoomID_or_Null = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/discussionPage/${auth.userid}/${user_id}`,
          "GET",
          null
        );
        // alert("Main bhi call ho raha hu");
        // console.log({Roomidapnawala: {RoomID}});
        setRoomID(responseData.roomid);
        
      } catch (err) { 
        console.log(err);
      }
    };
    fetchRoomID_or_Null();

    const createNewRoom = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/discussionPage/${auth.userid}/${user_id}`,
          "POST",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        SetNewRoomId(responseData.roomId);
      } catch (err) {
        console.log(err);
      }
      // alert("Room created");
      // console.log({Roomid: {RoomID}});
    }
    if(RoomID===null){
    createNewRoom();}
  }, [RoomID]);

  
  return (
    RoomID?(
    <div>
      <ChatApp roomid={RoomID} />
      <h1>
        Created {auth.userid} {user_id} {RoomID}
      </h1>
    </div>
  ) : (
    <div>
      <ChatApp roomid={NewRoomId} />
      <h1>
        Creating {auth.userid} {user_id} {RoomID} {NewRoomId}
      </h1>
    </div>
  )
  );
};

export default StartChat;
